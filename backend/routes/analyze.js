const express = require('express');
const router = express.Router();
const { callGemini, extractText, parseJsonFromText } = require('../services/gemini');
const { ANALYSIS_SYSTEM_PROMPT } = require('../services/prompts');
const db = require('../db');

function normalize(analysis, fallbackQuery) {
  const slug = (analysis.id || analysis.name || fallbackQuery || 'prodotto')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return {
    id: `${slug}-${Date.now().toString(36)}`,
    name: analysis.name || fallbackQuery,
    brand: analysis.brand || '',
    category: analysis.category || '',
    score: typeof analysis.score === 'number' ? analysis.score : 50,
    verdict: ['buy', 'wait', 'avoid'].includes(analysis.verdict) ? analysis.verdict : 'wait',
    currentPrice: analysis.currentPrice ?? null,
    fairMin: analysis.fairMin ?? null,
    fairMax: analysis.fairMax ?? null,
    savings: analysis.savings ?? null,
    reasoning: analysis.reasoning || 'Analisi non disponibile per questo prodotto.',
    alternatives: Array.isArray(analysis.alternatives) ? analysis.alternatives.slice(0, 3) : [],
    reviews: {
      positive: analysis.reviews?.positive || [],
      issues: analysis.reviews?.issues || [],
      insight: analysis.reviews?.insight || '',
    },
    truthCheck: Array.isArray(analysis.truthCheck) ? analysis.truthCheck : [],
    offers: Array.isArray(analysis.offers) ? analysis.offers.slice(0, 4) : [],
    priceHistory: analysis.priceHistory && typeof analysis.priceHistory === 'object' ? analysis.priceHistory : undefined,
    analyzedAt: new Date().toISOString(),
  };
}

router.post('/', async (req, res) => {
  const { query } = req.body;
  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Campo "query" mancante: scrivi un prodotto, un link o incolla un testo.' });
  }

  try {
    const response = await callGemini({
      system: ANALYSIS_SYSTEM_PROMPT,
      userText: `Analizza questo prodotto/offerta: ${query}`,
      useSearch: true,
    });

   const text = extractText(response);
   const raw = parseJsonFromText(text);
   const analysis = normalize(raw, query);

    const data = db.read();
    data.analyses.unshift(analysis);
    data.analyses = data.analyses.slice(0, 50);
    db.write(data);

    res.json(analysis);
  } catch (err) {
    console.error('[analyze] errore:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
