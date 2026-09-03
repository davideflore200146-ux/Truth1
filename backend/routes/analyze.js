const express = require('express');
const router = express.Router();

const { callGemini, extractText, parseJsonFromText } = require('../services/gemini');
const { searchTavily, formatTavilyResults } = require('../services/tavily');
const { ANALYSIS_SYSTEM_PROMPT } = require('../services/prompts');
const db = require('../db');

const SUPPORTED_LANGUAGES = {
  it: 'Italian',
  en: 'English',
  sc: 'Sardinian',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese'
};

function normalizeLanguage(language) {
  if (!language || typeof language !== 'string') {
    return 'it';
  }

  const normalized = language.toLowerCase().split('-')[0];

  return SUPPORTED_LANGUAGES[normalized]
    ? normalized
    : 'it';
}

function normalize(data, query) {
  const safe = data && typeof data === 'object' ? data : {};

  return {
    id: safe.id || String(query || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: safe.name || query || 'Prodotto',
    brand: safe.brand || '',
    category: safe.category || '',
    score: typeof safe.score === 'number' ? safe.score : 0,
    verdict: ['buy', 'wait', 'avoid'].includes(safe.verdict) ? safe.verdict : 'wait',
    currentPrice: typeof safe.currentPrice === 'number' ? safe.currentPrice : null,
    fairMin: typeof safe.fairMin === 'number' ? safe.fairMin : null,
    fairMax: typeof safe.fairMax === 'number' ? safe.fairMax : null,
    savings: typeof safe.savings === 'number' ? safe.savings : null,
    reasoning: safe.reasoning || '',
    alternatives: Array.isArray(safe.alternatives) ? safe.alternatives.slice(0, 3) : [],
    reviews: {
      positive: Array.isArray(safe.reviews?.positive) ? safe.reviews.positive.slice(0, 3) : [],
      issues: Array.isArray(safe.reviews?.issues) ? safe.reviews.issues.slice(0, 3) : [],
      insight: safe.reviews?.insight || ''
    },
    truthCheck: Array.isArray(safe.truthCheck) ? safe.truthCheck.slice(0, 4) : [],
    offers: Array.isArray(safe.offers) ? safe.offers.slice(0, 4) : [],
    ...(safe.priceHistory && typeof safe.priceHistory === 'object'
      ? { priceHistory: safe.priceHistory }
      : {})
  };
}

router.post('/', async (req, res) => {
  try {
    const { query, language } = req.body || {};

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Query mancante'
      });
    }

    const selectedLanguage = normalizeLanguage(language);
    const languageName = SUPPORTED_LANGUAGES[selectedLanguage];

    let searchContext = '';

    try {
      const tavilyData = await searchTavily(`${query} prezzo recensioni offerte`);
      searchContext = formatTavilyResults(tavilyData);
    } catch (searchError) {
      console.error('Errore ricerca Tavily:', searchError);
    }

    const userText = searchContext
      ? `Analizza questo prodotto/offerta: ${query}

LINGUA RICHIESTA DALL'UTENTE: ${languageName} (${selectedLanguage})

IMPORTANTE:
Tutti i contenuti testuali della risposta devono essere scritti esclusivamente nella lingua richiesta dall'utente.
Non usare italiano se la lingua richiesta è diversa.
Mantieni invariati i valori tecnici previsti dallo schema, inclusi "buy", "wait" e "avoid".

Risultati di ricerca web aggiornati:
${searchContext}`
      : `Analizza questo prodotto/offerta: ${query}

LINGUA RICHIESTA DALL'UTENTE: ${languageName} (${selectedLanguage})

IMPORTANTE:
Tutti i contenuti testuali della risposta devono essere scritti esclusivamente nella lingua richiesta dall'utente.
Non usare italiano se la lingua richiesta è diversa.
Mantieni invariati i valori tecnici previsti dallo schema, inclusi "buy", "wait" e "avoid".`;

    const localizedSystemPrompt = `${ANALYSIS_SYSTEM_PROMPT}

LINGUA OBBLIGATORIA DELL'UTENTE:
${languageName} (${selectedLanguage})

REGOLE LINGUISTICHE:
- Tutti i testi generati devono essere esclusivamente nella lingua richiesta.
- Non tradurre le chiavi JSON dello schema.
- Non tradurre i valori tecnici "buy", "wait" e "avoid".
- I nomi propri di marchi, negozi, prodotti e modelli devono mantenere la loro denominazione ufficiale quando necessario.
- Non aggiungere spiegazioni fuori dal JSON.
- Restituisci esclusivamente JSON valido.`;

    const response = await callGemini({
      system: localizedSystemPrompt,
      userText,
      useSearch: false
    });

    const text = extractText(response);
    const parsed = parseJsonFromText(text);
    const analysis = normalize(parsed, query);

    try {
      if (db && typeof db.saveAnalysis === 'function') {
        await db.saveAnalysis(analysis);
      }
    } catch (dbError) {
      console.error('Errore salvataggio analisi:', dbError);
    }

    return res.json(analysis);

  } catch (error) {
    console.error('Errore analisi:', error);

    return res.status(500).json({
      error: error?.message || 'Errore durante l’analisi'
    });
  }
});

module.exports = router;
