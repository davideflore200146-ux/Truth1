// backend/routes/analyze.js
//
// Endpoint POST /api/analyze
// Flusso: query utente -> (se è un link, risolvi redirect ed estrai il nome
// prodotto dalla pagina) -> Tavily (ricerca multi-negozio) -> Groq (analisi)
// -> risposta + storico prezzi salvato in db.json

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

// Scarica la pagina prodotto ed estrae un nome leggibile (og:title o
// <title>), perché cercare su Tavily un URL pieno di parametri tecnici
// (ref=, th=1, session id...) non produce risultati utili.
async function extractProductNameFromUrl(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      },
    });
    const html = await response.text();

    const ogMatch = html.match(
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogMatch && ogMatch[1]) return ogMatch[1].trim();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      // Pulisce suffissi tipici tipo " : Amazon.it: ..." o " - Amazon.it"
      return titleMatch[1].split(/[:\-–]\s*Amazon/i)[0].trim();
    }
  } catch (err) {
    // Se la pagina non è raggiungibile o blocca lo scraping, si torna all'URL
  }
  return null;
}

function isUrl(text) {
  return /^https?:\/\//i.test(text.trim());
}

// Mantiene il nome storico callGemini per compatibilità col resto del progetto.
// Usa lo schema completo definito in services/prompts.js (offers, reviews,
// truthCheck...), lo stesso che il frontend si aspetta.
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

// Salva uno snapshot di prezzo per il prodotto e restituisce lo storico
// accumulato finora.
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
      resolvedQuery = await resolveShortLink(resolvedQuery);

      // 0b. Estrae il nome vero del prodotto dalla pagina, invece di
      // usare l'URL intero come query di ricerca
      const productName = await extractProductNameFromUrl(resolvedQuery);
      if (productName) {
        resolvedQuery = productName;
      }
    }

    // 1. Ricerca multi-negozio su Tavily (generica + negozi principali)
    const tavilyResults = await searchTavilyMultiStore(resolvedQuery, 6, 2);

    if (!tavilyResults.length) {
      return res.status(404).json({ error: 'common.noResultsFound' });
    }

    // 2. Riduzione dati: fino a 8 risultati (più negozi coperti), ognuno
    // troncato -> continua a evitare il 413 su Groq
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
