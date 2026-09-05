// backend/services/tavily.js
//
// Servizio di ricerca web tramite Tavily: ricerca (search) ed estrazione
// contenuto pagina (extract). L'estrazione usa il crawler di Tavily invece
// di scaricare le pagine dal nostro server, perché siti come Amazon spesso
// bloccano le richieste provenienti da IP di hosting (es. Render).

const TAVILY_SEARCH_URL = 'https://api.tavily.com/search';
const TAVILY_EXTRACT_URL = 'https://api.tavily.com/extract';
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

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

  const response = await fetch(TAVILY_SEARCH_URL, {
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

async function searchTavily(query, maxResults = 10) {
  return tavilyRequest(query, maxResults);
}

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
 * Usa il crawler di Tavily per leggere il contenuto di una pagina (es. una
 * pagina prodotto Amazon), invece di scaricarla direttamente dal nostro
 * server. Restituisce { title, content } oppure null se fallisce.
 */
async function extractUrlContent(url) {
  if (!TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY mancante nelle variabili d\'ambiente');
  }

  try {
    const response = await fetch(TAVILY_EXTRACT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        urls: [url],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[tavily.extractUrlContent] Tavily Extract ha risposto ${response.status}: ${errText}`);
      return null;
    }

    const data = await response.json();
    const result = data.results && data.results[0];
    if (!result || !result.raw_content) return null;

    const rawContent = result.raw_content.trim();
    // Prima riga non vuota come "titolo" approssimativo della pagina
    const firstLine = rawContent.split('\n').map((l) => l.trim()).find((l) => l.length > 5) || '';

    return {
      title: firstLine.slice(0, 150),
      content: rawContent.slice(0, 1200),
    };
  } catch (err) {
    console.error('[tavily.extractUrlContent] errore:', err.message);
    return null;
  }
}

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
  extractUrlContent,
  prepareResultsForGroq,
};
