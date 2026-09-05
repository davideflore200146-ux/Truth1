// backend/routes/analyze.js
//
// Endpoint POST /api/analyze
// Flusso: query utente -> (se è un link corto, risolvi il redirect) -> Tavily (ricerca) -> Groq (analisi) -> risposta + storico prezzi salvato in db.json

const express = require('express');
const router = express.Router();
const { searchTavily, prepareResultsForGroq } = require('../services/tavily');
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
// così Tavily riceve sempre l'URL finale con il vero nome del prodotto.
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

function isUrl(text) {
  return /^https?:\/\//i.test(text.trim());
}

// Mantiene il nome storico callGemini per compatibilità col resto del progetto.
// Ora usa lo schema completo definito in services/prompts.js (offers, reviews,
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
// accumulato finora. Nessuna fonte gratuita dà uno storico prezzi reale:
// TRUTH lo costruisce da sé, un punto per ogni analisi effettuata.
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
      resolvedQuery = await resolveShortLink(resolvedQuery);
    }

    const tavilyResults = await searchTavily(resolvedQuery, 10);

    if (!tavilyResults.length) {
      return res.status(404).json({ error: 'common.noResultsFound' });
    }

    const searchResultsText = prepareResultsForGroq(tavilyResults, 5, 900);

    const analysis = await callGemini(resolvedQuery, searchResultsText, language);

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
