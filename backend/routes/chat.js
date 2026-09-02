const express = require('express');
const router = express.Router();
const { callGemini, extractText } = require('../services/gemini');
const { CHAT_SYSTEM_PROMPT } = require('../services/prompts');
const db = require('../db');

router.post('/', async (req, res) => {
  const { analysisId, question } = req.body;
  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Campo "question" mancante.' });
  }

  const data = db.read();
  const analysis = data.analyses.find((a) => a.id === analysisId);
  if (!analysis) {
    return res.status(404).json({ error: "Analisi non trovata: rifai l'analisi del prodotto." });
  }

  try {
    const response = await callGemini({
      system: CHAT_SYSTEM_PROMPT(analysis),
      userText: question,
      useSearch: false,
    });
    const answer = extractText(response);
    res.json({ answer });
  } catch (err) {
    console.error('[chat] errore:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
