const express = require('express');
const router = express.Router();

const {
searchTavilyMultiStore,
extractUrlContent,
prepareResultsForGroq,
} = require('../services/tavily');

const { ANALYSIS_SYSTEM_PROMPT } = require('../services/prompts');
const db = require('../db');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'openai/gpt-oss-120b';

const BROWSER_USER_AGENT =
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36';

const LANGUAGE_NAMES = {
it: 'Italian',
en: 'English',
sc: 'Sardinian',
es: 'Spanish',
fr: 'French',
de: 'German',
pt: 'Portuguese',
};

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

function isUrl(text) {
const value = String(text || '').trim();

return /^https?://\S+$/i.test(value);
}

async function resolveShortLink(url) {
try {
const response = await fetch(url, {
method: 'GET',
redirect: 'follow',
headers: {
'User-Agent': BROWSER_USER_AGENT,
},
});


console.log(
  `[resolveShortLink] "${url}" -> "${response.url}" (status ${response.status})`
);

return response.url || url;


} catch (err) {
console.error(
`[resolveShortLink] fallito per "${url}":`,
err.message
);


return url;


}
}

function cleanSearchResults(results) {
if (!Array.isArray(results)) {
return [];
}

return results
.filter(result => result && typeof result === 'object')
.map(result => ({
title: result.title || '',
url: result.url || '',
content:
result.content ||
result.rawContent ||
result.description ||
'',
}))
.filter(result => result.title || result.url || result.content);
}

function buildFallbackOffers(analysis, tavilyResults) {
if (
!analysis ||
!Array.isArray(tavilyResults) ||
!tavilyResults.length
) {
return [];
}

const offers = [];

for (const result of tavilyResults) {
const text = [
result.title || '',
result.content || '',
result.description || '',
].join(' ');


if (!text.trim()) {
  continue;
}

const priceMatches = text.match(
  /(?:€|EUR)\s?\d{1,5}(?:[.,]\d{1,2})?|\d{1,5}(?:[.,]\d{1,2})?\s?(?:€|EUR)/gi
);

if (!priceMatches || !priceMatches.length) {
  continue;
}

const priceText = priceMatches[0];

const normalized = priceText
  .replace(/EUR/gi, '')
  .replace(/€/g, '')
  .replace(/\s/g, '')
  .replace(/\.(?=\d{3}(?:,|$))/g, '')
  .replace(',', '.');

const price = Number(normalized);

if (!Number.isFinite(price) || price <= 0) {
  continue;
}

let store = result.title || 'Negozio';

store = store
  .replace(/\s*[-|–—]\s*.*$/g, '')
  .trim();

if (!store) {
  store = 'Negozio';
}

const duplicate = offers.some(
  offer =>
    offer.store.toLowerCase() === store.toLowerCase() &&
    offer.price === price
);

if (duplicate) {
  continue;
}

offers.push({
  store,
  price,
  shipping: 'Informazione non disponibile',
  total: price,
  url: result.url || null,
});

if (offers.length >= 8) {
  break;
}


}

return offers;
}

async function callGroq(
query,
searchResultsText,
languageCode = 'it'
) {
if (!GROQ_API_KEY) {
throw new Error(
"GROQ_API_KEY mancante nelle variabili d'ambiente"
);
}

const languageName =
LANGUAGE_NAMES[languageCode] || 'Italian';

const today =
new Date().toISOString().slice(0, 10);

const userPrompt = `DATA CORRENTE: ${today}

LINGUA OBBLIGATORIA:
${languageName}

PRODOTTO CERCATO:
"${query}"

RISULTATI WEB DA ANALIZZARE:
${searchResultsText}

ISTRUZIONI IMPORTANTI PER PREZZI E OFFERTE:

1. Cerca attentamente nei risultati web prezzi reali del prodotto.
2. Cerca anche nomi di negozi, marketplace e rivenditori.
3. Se trovi un prezzo chiaramente associato al prodotto cercato, inseriscilo nelle "offers".
4. Non lasciare "offers" vuoto se nei risultati web è presente almeno un prezzo chiaramente associato al prodotto.
5. Non inventare MAI prezzi, negozi, disponibilità o condizioni.
6. Se un prezzo non è chiaramente associato al prodotto, non utilizzarlo.
7. "currentPrice" deve essere il prezzo reale più rilevante trovato nei risultati.
8. Se sono presenti più offerte reali, inseriscile tutte quelle verificabili, fino a un massimo di 8.
9. Per ogni offerta usa il nome reale del negozio quando è identificabile.
10. Se non è possibile verificare nessun prezzo, usa null per "currentPrice" e [] per "offers".
11. Restituisci esclusivamente JSON valido.
12. Non aggiungere testo fuori dal JSON.`;

const requestBody = {
model: GROQ_MODEL,


messages: [
  {
    role: 'system',
    content: ANALYSIS_SYSTEM_PROMPT,
  },
  {
    role: 'user',
    content: userPrompt,
  },
],

temperature: 0.1,
max_tokens: 1000,
reasoning_effort: 'low',

response_format: {
  type: 'json_object',
},


};

const MAX_RETRIES = 3;

for (
let attempt = 0;
attempt <= MAX_RETRIES;
attempt++
) {
let response;


try {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 45000);

  try {
    console.log(
      `[Groq] Invio richiesta. Tentativo ${attempt + 1}/${MAX_RETRIES + 1}`
    );

    response = await fetch(
      GROQ_API_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },

        body: JSON.stringify(requestBody),

        signal: controller.signal,
      }
    );
  } finally {
    clearTimeout(timeout);
  }
} catch (err) {
  if (err.name === 'AbortError') {
    throw new Error(
      'Groq ha impiegato troppo tempo a rispondere (timeout di 45 secondi)'
    );
  }

  throw new Error(
    `Errore di connessione a Groq: ${err.message}`
  );
}

if (response.ok) {
  let data;

  try {
    data = await response.json();
  } catch (err) {
    throw new Error(
      `Groq ha restituito una risposta non valida: ${err.message}`
    );
  }

  const rawContent =
    data?.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error(
      'Groq non ha restituito contenuto valido'
    );
  }

  console.log(
    `[Groq] Risposta ricevuta (${rawContent.length} caratteri)`
  );

  console.log(
    '[Groq] ===== JSON GREZZO RESTITUITO ====='
  );

  console.log(rawContent);

  console.log(
    '[Groq] ===== FINE JSON GREZZO ====='
  );

  try {
    const parsedContent =
      JSON.parse(rawContent);

    console.log(
      '[Groq] ===== JSON PARSATO ====='
    );

    console.log(
      JSON.stringify(
        parsedContent,
        null,
        2
      )
    );

    console.log(
      '[Groq] ===== FINE JSON PARSATO ====='
    );

    console.log(
      '[Groq] currentPrice:',
      parsedContent?.currentPrice
    );

    console.log(
      '[Groq] offers:',
      JSON.stringify(
        parsedContent?.offers ?? [],
        null,
        2
      )
    );

    return parsedContent;
  } catch (err) {
    console.error(
      '[Groq] JSON non valido:',
      rawContent
    );

    throw new Error(
      `Impossibile parsare la risposta JSON di Groq: ${err.message}`
    );
  }
}

const errText =
  await response.text();

console.error(
  `[Groq] HTTP ${response.status}: ${errText}`
);

if (
  response.status === 429 &&
  attempt < MAX_RETRIES
) {
  let waitMs = 7000;

  try {
    const errorData =
      JSON.parse(errText);

    const message =
      errorData?.error?.message || '';

    const secondsMatch =
      message.match(
        /try again in ([0-9.]+)s/i
      );

    if (secondsMatch) {
      waitMs =
        Math.ceil(
          parseFloat(
            secondsMatch[1]
          ) * 1000
        ) + 1500;
    }
  } catch (_) {
    // Usiamo il valore predefinito.
  }

  waitMs = Math.min(
    Math.max(waitMs, 5000),
    20000
  );

  console.log(
    `[Groq] Rate limit 429. Attendo ${waitMs / 1000} secondi prima del nuovo tentativo.`
  );

  await sleep(waitMs);

  continue;
}

throw new Error(
  `Groq API ha risposto ${response.status}: ${errText}`
);


}

throw new Error(
'Groq non disponibile dopo i tentativi automatici'
);
}

function recordPriceSnapshot(
productId,
price
) {
if (
!productId ||
typeof price !== 'number' ||
!Number.isFinite(price) ||
price <= 0
) {
return [];
}

const data = db.read();

if (!data.priceHistory) {
data.priceHistory = {};
}

if (!data.priceHistory[productId]) {
data.priceHistory[productId] = [];
}

const today =
new Date().toISOString().slice(0, 10);

const history =
data.priceHistory[productId];

const last =
history[history.length - 1];

if (
!last ||
last.date !== today
) {
history.push({
date: today,
price,
});
} else {
last.price = price;
}

db.write(data);

return history;
}

router.post(
'/',
async (req, res) => {
const {
query,
language,
} = req.body;


if (
  !query ||
  typeof query !== 'string' ||
  !query.trim()
) {
  return res.status(400).json({
    error: 'common.missingQuery',
  });
}

try {
  let resolvedQuery =
    query.trim();

  let pageExtract = null;

  console.log(
    `[analyze] query ricevuta dal frontend: "${resolvedQuery}"`
  );

  /*
   * Una query testuale come "iphone 17" NON deve
   * essere trattata come URL.
   */
  if (isUrl(resolvedQuery)) {
    console.log(
      `[analyze] rilevato URL: "${resolvedQuery}"`
    );

    const expandedUrl =
      await resolveShortLink(
        resolvedQuery
      );

    pageExtract =
      await extractUrlContent(
        expandedUrl
      );

    if (
      pageExtract &&
      pageExtract.title
    ) {
      resolvedQuery =
        pageExtract.title;

      console.log(
        `[analyze] titolo estratto dalla pagina: "${resolvedQuery}"`
      );
    } else {
      resolvedQuery =
        expandedUrl;

      console.log(
        '[analyze] estrazione fallita, uso URL espanso come query'
      );
    }
  } else {
    console.log(
      '[analyze] query testuale normale, nessuna estrazione URL'
    );
  }

  console.log(
    `[analyze] query finale mandata a Tavily: "${resolvedQuery}"`
  );

  const tavilyResults =
    await searchTavilyMultiStore(
      resolvedQuery,
      3,
      1
    );

  if (
    pageExtract &&
    pageExtract.content
  ) {
    tavilyResults.unshift({
      title:
        pageExtract.title ||
        resolvedQuery,

      url:
        query.trim(),

      content:
        pageExtract.content,
    });
  }

  const cleanedResults =
    cleanSearchResults(
      tavilyResults
    );

  console.log(
    `[analyze] risultati totali disponibili: ${cleanedResults.length}`
  );

  if (!cleanedResults.length) {
    return res.status(404).json({
      error:
        'common.noResultsFound',
    });
  }

  console.log(
    '[analyze] ===== RISULTATI TAVILY ====='
  );

  console.log(
    JSON.stringify(
      cleanedResults,
      null,
      2
    )
  );

  console.log(
    '[analyze] ===== FINE RISULTATI TAVILY ====='
  );

  const searchResultsText =
    prepareResultsForGroq(
      cleanedResults,
      8,
      800
    );

  console.log(
    `[analyze] caratteri inviati a Groq: ${searchResultsText.length}`
  );

  console.log(
    '[analyze] avvio analisi Groq...'
  );

  let analysis =
    await callGroq(
      resolvedQuery,
      searchResultsText,
      language
    );

  /*
   * Normalizziamo sempre offers.
   */
  if (
    !Array.isArray(
      analysis.offers
    )
  ) {
    analysis.offers = [];
  }

  /*
   * Se Groq ha trovato le informazioni principali
   * ma non ha compilato offers, proviamo a recuperare
   * eventuali prezzi espliciti direttamente dai risultati
   * Tavily, senza inventare nulla.
   */
  if (
    analysis.offers.length === 0
  ) {
    const fallbackOffers =
      buildFallbackOffers(
        analysis,
        cleanedResults
      );

    if (
      fallbackOffers.length
    ) {
      console.log(
        `[analyze] trovate ${fallbackOffers.length} offerte reali direttamente nei risultati Tavily`
      );

      analysis.offers =
        fallbackOffers;
    }
  }

  /*
   * Se currentPrice non è disponibile ma esiste
   * un'offerta verificata, usiamo il prezzo più basso
   * tra le offerte realmente trovate.
   */
  if (
    (
      typeof analysis.currentPrice !==
      'number' ||
      !Number.isFinite(
        analysis.currentPrice
      ) ||
      analysis.currentPrice <= 0
    ) &&
    analysis.offers.length > 0
  ) {
    const validPrices =
      analysis.offers
        .map(
          offer =>
            Number(
              offer?.price
            )
        )
        .filter(
          price =>
            Number.isFinite(
              price
            ) &&
            price > 0
        );

    if (
      validPrices.length
    ) {
      analysis.currentPrice =
        Math.min(
          ...validPrices
        );

      console.log(
        `[analyze] currentPrice ricavato dall'offerta verificata più bassa: ${analysis.currentPrice}`
      );
    }
  }

  console.log(
    '[analyze] analisi Groq completata'
  );

  console.log(
    '[analyze] ===== RISPOSTA FINALE INVIATA A TRUTH-APP ====='
  );

  console.log(
    JSON.stringify(
      analysis,
      null,
      2
    )
  );

  console.log(
    '[analyze] ===== FINE RISPOSTA FINALE ====='
  );

  if (
    analysis &&
    analysis.id &&
    typeof analysis.currentPrice ===
      'number' &&
    Number.isFinite(
      analysis.currentPrice
    ) &&
    analysis.currentPrice > 0
  ) {
    const history =
      recordPriceSnapshot(
        analysis.id,
        analysis.currentPrice
      );

    analysis.priceHistory =
      history;
  }

  return res.json(
    analysis
  );

} catch (err) {
  console.error(
    'Errore /api/analyze:',
    err
  );

  return res.status(500).json({
    error:
      'common.analysisFailed',

    detail:
      err.message ||
      'Errore sconosciuto',
  });
}


}
);

module.exports = router;
