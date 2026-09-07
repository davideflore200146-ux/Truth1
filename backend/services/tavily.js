const TAVILY_SEARCH_URL = 'https://api.tavily.com/search';
const TAVILY_EXTRACT_URL = 'https://api.tavily.com/extract';
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const STORE_QUERIES = [
  (q) => `${q} prezzo Amazon Italia`,
  (q) => `${q} prezzo MediaWorld`,
  (q) => `${q} prezzo Unieuro`,
  (q) => `${q} prezzo eBay Italia`,
];

async function tavilyRequest(query, maxResults = 6) {
  if (!TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY mancante nelle variabili d'ambiente");
  }

  console.log(`[tavily.request] ricerca: "${query}"`);

  const response = await fetch(TAVILY_SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: 'advanced',
      include_raw_content: true,
      include_answer: false,
      max_results: maxResults,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();

    throw new Error(
      `Tavily API error ${response.status}: ${errText}`
    );
  }

  const data = await response.json();

  return Array.isArray(data.results)
    ? data.results
    : [];
}

async function searchTavily(query, maxResults = 10) {
  return tavilyRequest(query, maxResults);
}

function normalizeResult(result) {
  if (!result || typeof result !== 'object') {
    return null;
  }

  return {
    title: String(
      result.title ||
      result.name ||
      ''
    ).trim(),

    url: String(
      result.url ||
      ''
    ).trim(),

    content: String(
      result.raw_content ||
      result.content ||
      result.description ||
      ''
    ).trim(),

    score:
      typeof result.score === 'number'
        ? result.score
        : null,
  };
}

function isUsefulResult(result) {
  if (!result) {
    return false;
  }

  return Boolean(
    result.title ||
    result.url ||
    result.content
  );
}

function deduplicateResults(results) {
  const seen = new Set();
  const deduped = [];

  for (const result of results) {
    if (!result || !result.url) {
      continue;
    }

    const normalizedUrl =
      result.url
        .trim()
        .replace(/\/+$/, '')
        .toLowerCase();

    if (
      !normalizedUrl ||
      seen.has(normalizedUrl)
    ) {
      continue;
    }

    seen.add(normalizedUrl);
    deduped.push(result);
  }

  return deduped;
}

async function searchTavilyMultiStore(
  query,
  maxResultsGeneral = 8,
  maxResultsPerStore = 3
) {
  const cleanQuery =
    String(query || '').trim();

  if (!cleanQuery) {
    return [];
  }

  let generalResults = [];

  /*
   * Prima ricerca generale.
   * La query contiene esplicitamente "prezzo"
   * per aumentare la probabilità di ottenere
   * pagine con prezzi reali.
   */
  try {
    const generalQuery =
      `${cleanQuery} prezzo offerte`;

    console.log(
      `[tavily.search] ricerca generale: "${generalQuery}"`
    );

    generalResults =
      await tavilyRequest(
        generalQuery,
        maxResultsGeneral
      );
  } catch (err) {
    console.error(
      '[tavily.search] errore ricerca principale:',
      err.message
    );
  }

  /*
   * Se la ricerca generale non produce risultati,
   * proviamo una query ancora più orientata
   * all'acquisto.
   */
  if (
    generalResults.length === 0
  ) {
    try {
      const fallbackQuery =
        `${cleanQuery} comprare prezzo online`;

      console.log(
        `[tavily.search] nessun risultato. Provo fallback: "${fallbackQuery}"`
      );

      generalResults =
        await tavilyRequest(
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

  /*
   * Ricerche specifiche per negozio.
   * Vengono eseguite in parallelo.
   */
  const storeSearches =
    STORE_QUERIES.map(
      async (buildQuery) => {
        const storeQuery =
          buildQuery(cleanQuery);

        try {
          const results =
            await tavilyRequest(
              storeQuery,
              maxResultsPerStore
            );

          console.log(
            `[tavily.search] "${storeQuery}" -> ${results.length} risultati`
          );

          return results;
        } catch (err) {
          console.error(
            `[tavily.search] errore ricerca "${storeQuery}":`,
            err.message
          );

          return [];
        }
      }
    );

  const storeResults =
    await Promise.all(
      storeSearches
    );

  /*
   * Uniamo tutti i risultati.
   */
  const merged = [
    ...generalResults,
    ...storeResults.flat(),
  ];

  /*
   * Normalizziamo il formato.
   */
  const normalized =
    merged
      .map(normalizeResult)
      .filter(isUsefulResult);

  /*
   * Eliminiamo duplicati.
   */
  const deduped =
    deduplicateResults(
      normalized
    );

  /*
   * Ordiniamo prima i risultati che
   * hanno contenuto effettivo.
   */
  deduped.sort(
    (a, b) => {
      const scoreA =
        (a.content ? 2 : 0) +
        (a.title ? 1 : 0);

      const scoreB =
        (b.content ? 2 : 0) +
        (b.title ? 1 : 0);

      return scoreB - scoreA;
    }
  );

  console.log(
    `[tavily.search] "${cleanQuery}" -> ${deduped.length} risultati finali`
  );

  return deduped;
}

/**
 * Usa Tavily Extract per leggere il contenuto
 * completo di una pagina prodotto.
 */
async function extractUrlContent(url) {
  if (!TAVILY_API_KEY) {
    throw new Error(
      "TAVILY_API_KEY mancante nelle variabili d'ambiente"
    );
  }

  if (!url) {
    return null;
  }

  try {
    const response =
      await fetch(
        TAVILY_EXTRACT_URL,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            api_key:
              TAVILY_API_KEY,

            urls: [url],
          }),
        }
      );

    if (!response.ok) {
      const errText =
        await response.text();

      console.error(
        `[tavily.extractUrlContent] Tavily Extract ha risposto ${response.status}: ${errText}`
      );

      return null;
    }

    const data =
      await response.json();

    const result =
      data.results &&
      data.results[0];

    if (
      !result ||
      !result.raw_content
    ) {
      return null;
    }

    const rawContent =
      String(
        result.raw_content
      ).trim();

    const firstLine =
      rawContent
        .split('\n')
        .map(
          line => line.trim()
        )
        .find(
          line =>
            line.length > 5
        ) || '';

    return {
      title:
        firstLine.slice(
          0,
          150
        ),

      content:
        rawContent.slice(
          0,
          5000
        ),
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
  maxResults = 10,
  maxCharsPerResult = 2500
) {
  if (
    !Array.isArray(
      tavilyResults
    )
  ) {
    return '';
  }

  return tavilyResults
    .slice(
      0,
      maxResults
    )
    .map(
      (result, index) => {
        const title =
          String(
            result.title ||
            'Risultato senza titolo'
          );

        const url =
          String(
            result.url || ''
          );

        const content =
          String(
            result.content ||
            ''
          )
            .slice(
              0,
              maxCharsPerResult
            )
            .trim();

        return [
          `[RISULTATO ${index + 1}]`,
          `TITOLO: ${title}`,
          `URL: ${url}`,
          `CONTENUTO:`,
          content,
        ].join('\n');
      }
    )
    .join('\n\n');
}

module.exports = {
  searchTavily,
  searchTavilyMultiStore,
  extractUrlContent,
  prepareResultsForGroq,
};
