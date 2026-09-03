// Wrapper per l'API di ricerca Tavily.
// La ricerca viene ottimizzata per prodotti, prezzi,
// disponibilità e modelli recenti.

async function searchTavily(query, options = {}) {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey || apiKey.includes('xxxxxxxx')) {
    throw new Error(
      'TAVILY_API_KEY non configurata. Registrati gratis su tavily.com e inserisci la tua chiave.'
    );
  }

  const cleanQuery =
    typeof query === 'string'
      ? query.trim()
      : '';

  if (!cleanQuery) {
    throw new Error(
      'Query Tavily mancante.'
    );
  }

  const res = await fetch(
    'https://api.tavily.com/search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: cleanQuery,

        // Advanced è più adatto quando dobbiamo
        // identificare esattamente un modello recente.
        search_depth:
          options.searchDepth || 'advanced',

        // Più fonti = meno probabilità che Gemini
        // confonda un modello con la generazione precedente.
        max_results:
          options.maxResults || 10,

        include_answer: false,

        // Manteniamo risultati recenti e pertinenti.
        topic: 'general',

        // Non includiamo immagini: TRUTH attualmente
        // utilizza testo e dati web per questa analisi.
        include_images: false,
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();

    throw new Error(
      `Tavily API ha risposto ${res.status}: ${errText}`
    );
  }

  const data = await res.json();

  return data;
}

function formatTavilyResults(data) {
  const results = Array.isArray(data?.results)
    ? data.results
    : [];

  return results
    .map((result, index) => {
      const title =
        result?.title || 'Fonte senza titolo';

      const url =
        result?.url || '';

      const content =
        result?.content || '';

      return [
        `[Fonte ${index + 1}]`,
        `Titolo: ${title}`,
        `URL: ${url}`,
        `Contenuto: ${content}`,
      ].join('\n');
    })
    .join('\n\n');
}

module.exports = {
  searchTavily,
  formatTavilyResults,
};
