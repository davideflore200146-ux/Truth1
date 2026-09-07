// backend/services/tavily.js

const TAVILY_SEARCH_URL = 'https://api.tavily.com/search';
const TAVILY_EXTRACT_URL = 'https://api.tavily.com/extract';
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const STORE_QUERIES = [
  (q) => `${q} Amazon`,
  (q) => `${q} MediaWorld`,
  (q) => `${q} Unieuro`,
  (q) => `${q} eBay`,
];

async function tavilyRequest(query, maxResults = 6) {
  if (!TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY mancante nelle variabili d'ambiente");
  }

  const response = await fetch(TAVILY_SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: 'basic',
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

  return Array.isArray(data.results) ? data.results : [];
}

async function searchTavily(query, maxResults = 10) {
  return tavilyRequest(query, maxResults);
}

async function searchTavilyMultiStore(
  query,
  maxResultsGeneral = 6,
  maxResultsPerStore = 2
) {
  const cleanQuery = String(query || '').trim();

  if (!cleanQuery) {
    return [];
  }

  let generalResults = [];

  // Prima ricerca: query originale
  try {
    generalResults = await tavilyRequest(
      cleanQuery,
      maxResultsGeneral
    );
  } catch (err) {
    console.error(
      '[tavily.search] errore ricerca principale:',
      err.message
    );
  }

  // Se non trova nulla, proviamo una query più semplice
  if (generalResults.length === 0) {
    try {
      const fallbackQuery = `${cleanQuery} prezzo prodotto`;

      console.log(
        `[tavily.search] nessun risultato. Provo fallback: ${fallbackQuery}`
      );

      generalResults = await tavilyRequest(
        fallbackQuery,
        maxResultsGeneral
      );
    } catch (err) {
      console.error(
        '[tavily.search] errore ricerca fallback:',
        err.message
      );
    }
  }

  // Ricerche specifiche nei principali negozi
  const storeSearches = STORE_QUERIES.map(async (buildQuery) => {
    const storeQuery = buildQuery(cleanQuery);

    try {
      return await tavilyRequest(
        storeQuery,
        maxResultsPerStore
      );
    } catch (err) {
      console.error(
        `[tavily.search] errore ricerca "${storeQuery}":`,
        err.message
      );

      return [];
    }
  });

  const storeResults = await Promise.all(storeSearches);

  const merged = [
    ...generalResults,
    ...storeResults.flat(),
  ];

  // Rimuove risultati duplicati
  const seen = new Set();
  const deduped = [];

  for (const result of merged) {
    if (!result || !result.url) {
      continue;
    }

    const normalizedUrl = result.url.trim();

    if (!normalizedUrl || seen.has(normalizedUrl)) {
      continue;
    }

    seen.add(normalizedUrl);
    deduped.push(result);
  }

  console.log(
    `[tavily.search] "${cleanQuery}" -> ${deduped.length} risultati`
  );

  return deduped;
}

/**
 * Usa Tavily Extract per leggere il contenuto di una pagina prodotto.
 */
async function extractUrlContent(url) {
  if (!TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY mancante nelle variabili d'ambiente");
  }

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(TAVILY_EXTRACT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        urls: [url],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();

      console.error(
        `[tavily.extractUrlContent] Tavily Extract ha risposto ${response.status}: ${errText}`
      );

      return null;
    }

    const data = await response.json();
    const result = data.results && data.results[0];

    if (!result || !result.raw_content) {
      return null;
    }

    const rawContent = result.raw_content.trim();

    const firstLine =
      rawContent
        .split('\n')
        .map((line) => line.trim())
        .find((line) => line.length > 5) || '';

    return {
      title: firstLine.slice(0, 150),
      content: rawContent.slice(0, 1200),
    };
  } catch (err) {
    console.error(
      '[tavily.extractUrlContent] errore:',
      err.message
    );

    return null;
  }
}

function prepareResultsForGroq(
  tavilyResults,
  maxResults = 5,
  maxCharsPerResult = 900
) {
  if (!Array.isArray(tavilyResults)) {
    return '';
  }

  return tavilyResults
    .slice(0, maxResults)
    .map((result, index) => {
      const title = String(result.title || 'Risultato senza titolo');
      const url = String(result.url || '');
      const snippet = String(result.content || '')
        .slice(0, maxCharsPerResult)
        .trim();

      return `[${index + 1}] ${title}\nURL: ${url}\n${snippet}`;
    })
    .join('\n\n');
}

module.exports = {
  searchTavily,
  searchTavilyMultiStore,
  extractUrlContent,
  prepareResultsForGroq,
};
