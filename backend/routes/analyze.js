const express = require('express');
const router = express.Router();

const { callGemini, extractText, parseJsonFromText } = require('../services/gemini');
const { ANALYSIS_SYSTEM_PROMPT } = require('../services/prompts');
const db = require('../db');

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
const { query } = req.body || {};


if (!query || typeof query !== 'string') {
  return res.status(400).json({
    error: 'Query mancante'
  });
}

const response = await callGemini({
  system: ANALYSIS_SYSTEM_PROMPT,
  userText: `Analizza questo prodotto/offerta: ${query}`,
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
