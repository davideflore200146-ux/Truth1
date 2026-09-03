const express = require('express');
const router = express.Router();
const { callGemini, extractText } = require('../services/gemini');
const { CHAT_SYSTEM_PROMPT } = require('../services/prompts');
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

router.post('/', async (req, res) => {
  const { analysisId, question, language } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Campo "question" mancante.' });
  }

  const data = db.read();
  const analysis = data.analyses.find((a) => a.id === analysisId);

  if (!analysis) {
    return res.status(404).json({
      error: "Analisi non trovata: rifai l'analisi del prodotto."
    });
  }

  const selectedLanguage = normalizeLanguage(language);
  const languageName = SUPPORTED_LANGUAGES[selectedLanguage];

  try {
    const response = await callGemini({
      system: CHAT_SYSTEM_PROMPT(analysis, languageName),
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
