// backend/routes/analyze.js
//
// Endpoint POST /api/analyze
// Flusso: query utente -> (se è un link, risolvi redirect + estrai slug o
// ASIN dal link) -> Tavily (ricerca multi-negozio) -> Groq (analisi) ->
// risposta + storico prezzi salvato in db.json

const express = require('express');
const router = express.Router();
const { searchTavilyMultiStore, prepareResultsForGroq } = require('../services/tavily');
const { ANALYSIS_SYSTEM_PROMPT } = require('../services/prompts');
const db = require('../db');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'openai/gpt-oss-120b';

const LANGUAGE_NAMES = {
  it: 'Italian',
  en: 'English',
  sc: 'Sardinian',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
};

// Risolve i link corti (amzn.eu, amzn.to, bit.ly, ecc.) seguendo i redirect,
// per ottenere l'URL finale della pagina prodotto.
async function resolveShortLink(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return response.url || url;
  } catch (err) {
    try {
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      return response.url || url;
    } catch (err2) {
      return url;
    }
  }
}

// Estrae lo slug leggibile dall'URL Amazon, quando presente
// (es. amazon.it/Roborock-Qrevo-S-Pro-Aspirapolvere/dp/B0XXXXXXXX -> "Roborock Qrevo S Pro Aspirapolvere")
function extractSlugFromAmazonUrl(url) {
  const match = url.match(/amazon\.[a-z.]+\/([^/?]+)\/(?:dp|gp\/product)\//i);
  if (match && match[1]) {
    const slug = decodeURIComponent(match[1]).replace(/-/g, ' ').trim();
    if (slug.length > 5 && !/^dp$/i.test(slug)) return slug;
  }
  return null;
}

// Estrae il codice ASIN (identificativo prodotto Amazon) dall'URL, sempre
// presente anche nei link brevi risolti, anche quando manca lo slug.
function extractAsin(url) {
  const match = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
  return match ? match[1] : null;
}

function isUrl(text) {
  return /^https?:\/\//i.test(text.trim());
}

// Mantiene il nome storico callGemini per compatibilità col resto del progetto.
async function callGemini(query, searchResultsText, languageCode = 'it') {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY mancante nelle variabili d\'ambiente');
  }

  const languageName = LANGUAGE_NAMES[languageCode] || 'Italian';
  const today = new Date().toISOString().slice(0, 10);

  const userPrompt = `DATA CORRENTE REALE: ${today}
LINGUA OBBLIGATORIA PER TUTTI I TESTI: ${languageName}

Prodotto/richiesta cercata dall'utente (identità primaria, non sostituirla): "${query}"

RISULTATI DI RICERCA WEB:
${searchResultsText}`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 1800,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API ha risposto ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error('Groq non ha restituito contenuto valido');
  }

  try {
    return JSON.parse(rawContent);
  } catch (e) {
    throw new Error(`Impossibile parsare la risposta JSON di Groq: ${e.message}`);
  }
}

function recordPriceSnapshot(productId, price) {
  if (!productId || typeof price !== 'number') return [];

  const data = db.read();
  if (!data.priceHistory) data.priceHistory = {};
  if (!data.priceHistory[productId]) data.priceHistory[productId] = [];

  const today = new Date().toISOString().slice(0, 10);
  const history = data.priceHistory[productId];
  const last = history[history.length - 1];

  if (!last || last.date !== today) {
    history.push({ date: today, price });
  } else {
    last.price = price;
  }

  db.write(data);
  return history;
}

router.post('/analyze', async (req, res) => {
  const { query, language } = req.body;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'common.missingQuery' });
  }

  try {
    let resolvedQuery = query.trim();

    if (isUrl(resolvedQuery)) {
      // 0a. Risolve i link corti seguendo i redirect
      const expandedUrl = await resolveShortLink(resolvedQuery);

      // 0b. Prova prima lo slug leggibile nell'URL...
      const slug = extractSlugFromAmazonUrl(expandedUrl);
      if (slug) {
        resolvedQuery = slug;
      } else {
        // ...altrimenti usa l'ASIN come termine di ricerca (funziona anche
        // quando il link non contiene il nome prodotto, senza dover
        // scaricare la pagina Amazon, che spesso blocca lo scraping)
        const asin = extractAsin(expandedUrl);
        resolvedQuery = asin ? `Amazon ${asin}` : expandedUrl;
      }
    }

    // 1. Ricerca multi-negozio su Tavily (generica + negozi principali)
    const tavilyResults = await searchTavilyMultiStore(resolvedQuery, 6, 2);

    if (!tavilyResults.length) {
      return res.status(404).json({ error: 'common.noResultsFound' });
    }

    // 2. Riduzione dati: fino a 8 risultati, ognuno troncato -> evita il 413 su Groq
    const searchResultsText = prepareResultsForGroq(tavilyResults, 8, 700);

    // 3. Analisi con Groq, con lo schema completo (offers, reviews, truthCheck...)
    const analysis = await callGemini(resolvedQuery, searchResultsText, language);

    // 4. Storico prezzi: salva uno snapshot e restituisci l'accumulo reale
    if (analysis && analysis.id && typeof analysis.currentPrice === 'number') {
      const history = recordPriceSnapshot(analysis.id, analysis.currentPrice);
      analysis.priceHistory = history;
    }

    return res.json(analysis);
  } catch (err) {
    console.error('Errore /api/analyze:', err.message);
    return res.status(500).json({ error: 'common.analysisFailed', detail: err.message });
  }
});

module.exports = router;
