// backend/services/tavily.js
//
// Servizio di ricerca web tramite Tavily.
// Obiettivo: restituire risultati "leggeri" (snippet troncati) così che il
// payload passato a Groq non superi mai il limite di request size (causa
// dell'errore 413 "Request Body Too Large").

const TAVILY_API_URL = 'https://api.tavily.com/search';
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

/**
 * Esegue una ricerca su Tavily per la query indicata.
 * NON richiede raw_content (pagina intera) — solo lo snippet breve che
 * Tavily genera già, molto più corto e sufficiente per l'analisi.
 *
 * @param {string} query - query di ricerca (es. "iPhone 17 prezzo recensioni")
 * @param {number} maxResults - quanti risultati chiedere a Tavily (copertura ricerca)
 * @returns {Promise<Array<{title:string, url:string, content:string, score:number}>>}
 */
async function searchTavily(query, maxResults = 10) {
  if (!TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY mancante nelle variabili d\'ambiente');
  }

  const response = await fetch(TAVILY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: 'advanced', // snippet più informativi, ma restano brevi
      include_raw_content: false, // IMPORTANTE: niente pagina intera
      include_answer: false,
      max_results: maxResults,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Tavily API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.results || [];
}

/**
 * Prepara i risultati Tavily per essere inviati a Groq:
 * - tiene solo i migliori N risultati (per rilevanza, già ordinati da Tavily)
 * - tronca ogni snippet a un tetto fisso di caratteri
 * - produce un testo compatto, senza campi inutili (score, favicon, images...)
 *
 * @param {Array} tavilyResults - risultati grezzi da searchTavily()
 * @param {number} maxResults - quanti risultati usare per l'analisi (default 5)
 * @param {number} maxCharsPerResult - tetto caratteri per singolo risultato (default 900)
 * @returns {string} testo pronto da inserire nel prompt per Groq
 */
function prepareResultsForGroq(tavilyResults, maxResults = 5, maxCharsPerResult = 900) {
  return tavilyResults
    .slice(0, maxResults)
    .map((r, i) => {
      const snippet = (r.content || '').slice(0, maxCharsPerResult).trim();
      return `[${i + 1}] ${r.title}\nURL: ${r.url}\n${snippet}`;
    })
    .join('\n\n');
}

module.exports = {
  searchTavily,
  prepareResultsForGroq,
};
