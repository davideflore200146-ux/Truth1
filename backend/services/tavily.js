// Wrapper minimale per l'API di ricerca Tavily — piano gratuito, nessuna carta richiesta.
async function searchTavily(query, options = {}) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey || apiKey.includes('xxxxxxxx')) {
    throw new Error(
      'TAVILY_API_KEY non configurata. Registrati gratis su tavily.com e inserisci la tua chiave.'
    );
  }

  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: options.searchDepth || 'basic',
      max_results: options.maxResults || 5,
      include_answer: false,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Tavily API ha risposto ${res.status}: ${errText}`);
  }

  return res.json();
}

function formatTavilyResults(data) {
  const results = Array.isArray(data?.results) ? data.results : [];
  return results
    .map((r, i) => `[Fonte ${i + 1}] ${r.title}\nURL: ${r.url}\n${r.content}`)
    .join('\n\n');
}

module.exports = { searchTavily, formatTavilyResults };