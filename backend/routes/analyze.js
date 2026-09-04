// backend/routes/analyze.js
//
// Endpoint POST /api/analyze
// Flusso: query utente -> Tavily (ricerca) -> Groq (analisi) -> risposta strutturata
//
// Adatta gli import in cima (router, eventuale auth/middleware) al resto del
// tuo server.js se necessario: qui è un modulo Express autonomo.

const express = require('express');
const router = express.Router();
const { searchTavily, prepareResultsForGroq } = require('../services/tavily');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'openai/gpt-oss-120b';

// Mantiene il nome storico callGemini per non dover cambiare il resto del
// progetto che già lo importa/chiama così — internamente ora chiama Groq.
async function callGemini(query, searchResultsText) {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY mancante nelle variabili d\'ambiente');
  }

  const systemPrompt = `Sei un assistente che analizza un prodotto SOLO in base ai risultati di ricerca forniti.

REGOLA FONDAMENTALE SUL PRODOTTO:
Analizza SOLO il prodotto cercato esattamente come scritto dall'utente: "${query}".
Se i risultati di ricerca menzionano un modello diverso (es. versione precedente o
successiva, variante diversa), NON sostituirlo e NON "avvicinarlo" a un modello che
conosci meglio. Se i dati trovati sembrano riferirsi a un modello diverso da quello
cercato, segnalalo esplicitamente nella risposta invece di correggerlo silenziosamente.

Rispondi SOLO in formato JSON valido, senza testo aggiuntivo, seguendo questa struttura:
{
  "productName": "string",
  "truthScore": number (0-100),
  "verdict": "compra" | "aspetta" | "non_conviene",
  "currentPrice": "string",
  "fairPrice": "string",
  "explanation": "string (max 5 righe)",
  "alternatives": ["string", "string", "string"],
  "warning": "string o null (es. se i dati sembrano riferirsi a un modello diverso)"
}`;

  const userPrompt = `Prodotto cercato: "${query}"\n\nRisultati di ricerca:\n\n${searchResultsText}`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 1200,
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

router.post('/analyze', async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'common.missingQuery' });
  }

  try {
    // 1. Ricerca su Tavily (copertura ampia: fino a 10 risultati)
    const tavilyResults = await searchTavily(query, 10);

    if (!tavilyResults.length) {
      return res.status(404).json({ error: 'common.noResultsFound' });
    }

    // 2. Riduzione dati: solo i migliori 5 risultati, ognuno troncato
    //    -> questo è ciò che evita il 413 su Groq
    const searchResultsText = prepareResultsForGroq(tavilyResults, 5, 900);

    // 3. Analisi con Groq (funzione ancora chiamata callGemini per compatibilità)
    const analysis = await callGemini(query, searchResultsText);

    return res.json(analysis);
  } catch (err) {
    console.error('Errore /api/analyze:', err.message);
    return res.status(500).json({ error: 'common.analysisFailed', detail: err.message });
  }
});

module.exports = router;
