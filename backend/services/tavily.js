// backend/services/tavily.js
//
// Servizio di ricerca web tramite Tavily.
// Obiettivo: restituire risultati "leggeri" (snippet troncati) così che il
// payload passato a Groq non superi mai il limite di request size (causa
// dell'errore 413 "Request Body Too Large"), e includere ricerche mirate
// sui principali negozi per popolare il confronto prezzi ("offers").

const TAVILY_API_URL = 'https://api.tavily.com/search';
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

// Negozi principali su cui cerchiamo esplicitamente un prezzo, oltre alla
// ricerca generica. Modifica/aggiungi in base ai negozi che vuoi coprire.
const STORE_QUERIES = [
  (q) => `${q} prezzo Amazon`,
  (q) => `${q} prezzo MediaWorld`,
  (q) => `${q} prezzo Unieuro`,
  (q) => `${q} prezzo eBay`,
];

async function tavilyRequest(query, maxResults) {
  if (!TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY mancante nelle variabili d\'ambiente');
  }

  const response = await fetch(TAVILY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: 'advanced',
      include_raw_content: false,
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
 * Ricerca generica (comportamento originale): usata anche per identità del
 * prodotto, recensioni, data di uscita, ecc.
 */
async function searchTavily(query, maxResults = 10) {
  return tavilyRequest(query, maxResults);
}

/**
 * Ricerca "multi-negozio": fa la ricerca generica PIÙ una ricerca mirata per
 * ciascun negozio in STORE_QUERIES, poi unisce e deduplica per URL. Se una
 * ricerca mirata fallisce o non trova nulla, viene semplicemente ignorata
 * (non blocca le altre).
 */
async function searchTavilyMultiStore(query, maxResultsGeneral = 6, maxResultsPerStore = 2) {
  const searches = [
    tavilyRequest(query, maxResultsGeneral),
    ...STORE_QUERIES.map((buildQuery) =>
      tavilyRequest(buildQuery(query), maxResultsPerStore).catch(() => [])
    ),
  ];

  const resultsPerSearch = await Promise.all(searches);
  const merged = resultsPerSearch.flat();

  const seen = new Set();
  const deduped = [];
  for (const r of merged) {
    if (r.url && !seen.has(r.url)) {
      seen.add(r.url);
      deduped.push(r);
    }
  }

  return deduped;
}

/**
 * Prepara i risultati Tavily per essere inviati a Groq (invariato).
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
  searchTavilyMultiStore,
  prepareResultsForGroq,
};
