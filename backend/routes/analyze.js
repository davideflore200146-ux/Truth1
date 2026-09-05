// backend/routes/analyze.js 
// 
// Endpoint POST /api/analyze 
// Flusso: query utente -> Tavily (ricerca, risultati troncati) -> Groq 
// (tramite services/gemini.js, con lo schema completo di ANALYSIS_SYSTEM_PROMPT) 
// -> salvataggio nel db -> risposta all'app. 
 
const express = require('express'); 
const router = express.Router(); 
 
const { searchTavily, prepareResultsForGroq } = require('../services/tavily'); 
const { callGemini, extractText, parseJsonFromText } = require('../services/gemini'); 
const { ANALYSIS_SYSTEM_PROMPT } = require('../services/prompts'); 
const db = require('../db'); 
 
const SUPPORTED_LANGUAGES = { 
  it: 'Italian', 
  en: 'English', 
  sc: 'Sardinian', 
  es: 'Spanish', 
  fr: 'French', 
  de: 'German', 
  pt: 'Portuguese', 
}; 
 
function normalizeLanguage(language) { 
  if (!language || typeof language !== 'string') { 
    return 'it'; 
  } 
  const normalized = language.toLowerCase().split('-')[0]; 
  return SUPPORTED_LANGUAGES[normalized] ? normalized : 'it'; 
} 
 
// Garantisce che l'id generato dal modello non collida con uno già salvato 
// (es. se l'utente ricerca due volte lo stesso prodotto). 
function ensureUniqueId(baseId, existingAnalyses) { 
  const existingIds = new Set(existingAnalyses.map((a) => a.id)); 
  if (!baseId || !existingIds.has(baseId)) { 
    return baseId || `analisi-${Date.now()}`; 
  } 
  let counter = 2; 
  let candidate = `${baseId}-${counter}`; 
  while (existingIds.has(candidate)) { 
    counter += 1; 
    candidate = `${baseId}-${counter}`; 
  } 
  return candidate; 
} 
 
router.post('/', async (req, res) => { 
  const { query, language } = req.body; 
 
  if (!query || typeof query !== 'string' || !query.trim()) { 
    return res.status(400).json({ error: 'common.missingQuery' }); 
  } 
 
  const selectedLanguage = normalizeLanguage(language); 
  const languageName = SUPPORTED_LANGUAGES[selectedLanguage]; 
 
  try { 
    // 1. Ricerca su Tavily (copertura ampia: fino a 10 risultati) 
    const tavilyResults = await searchTavily(query, 10); 
 
    if (!tavilyResults.length) { 
      return res.status(404).json({ error: 'common.noResultsFound' }); 
    } 
 
    // 2. Riduzione dati: fino a 10 risultati, ognuno troncato 
    //    -> mantiene la copertura per tutti i prodotti cercati 
    const searchResultsText = prepareResultsForGroq(tavilyResults, 10, 900); 
 
    // 3. Costruzione del messaggio utente per il modello. 
    //    ANALYSIS_SYSTEM_PROMPT richiede esplicitamente la data corrente reale 
    //    e la lingua obbligatoria nel messaggio utente. 
    const today = new Date().toISOString().slice(0, 10); 
    const userText = `Prodotto richiesto dall'utente: "${query}" 
 
Data corrente reale: ${today} 
 
Lingua obbligatoria per tutti i contenuti testuali: ${languageName} 
 
Risultati di ricerca web: 
 
${searchResultsText}`; 
 
    // 4. Chiamata al modello (stesso wrapper Groq usato dalla chat) 
    const response = await callGemini({ 
      system: ANALYSIS_SYSTEM_PROMPT, 
      userText, 
      useSearch: false, 
    }); 
 
    const rawText = extractText(response); 
    const analysis = parseJsonFromText(rawText); 
 
    // 5. Salvataggio nel db con id univoco, così chat/history/wishlist 
    //    possono ritrovare l'analisi in seguito. 
    const data = db.read(); 
    analysis.id = ensureUniqueId(analysis.id, data.analyses); 
    analysis.query = query; 
    analysis.language = selectedLanguage; 
    analysis.createdAt = new Date().toISOString(); 
 
    data.analyses.push(analysis); 
    db.write(data); 
 
    return res.json(analysis); 
  } catch (err) { 
    console.error('Errore /api/analyze:', err.message); 
    return res.status(500).json({ error: 'common.analysisFailed', detail: err.message }); 
  } 
}); 
 
module.exports = router;
