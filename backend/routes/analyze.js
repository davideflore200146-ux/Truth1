// backend/routes/analyze.js

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

function isUrl(text) {
  return /^https?:\/\//i.test(text.trim());
}

async function callGroq(query, searchResultsText, languageCode = 'it') {
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
LINGUA OBBLIGATORIA: ${languageName}

PRODOTTO CERCATO:
"${query}"

RISULTATI WEB:
${searchResultsText}

Analizza il prodotto usando esclusivamente le informazioni disponibili nei risultati web.
Restituisci esclusivamente JSON valido secondo il formato richiesto dal system prompt.`;

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

    // Output volutamente contenuto per ridurre il consumo TPM.
    max_tokens: 700,

    // Riduce il ragionamento interno.
    reasoning_effort: 'low',

    response_format: {
      type: 'json_object',
    },
  };

  const MAX_RETRIES = 3;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },

      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();

      const rawContent =
        data.choices?.[0]?.message?.content;

      if (!rawContent) {
        throw new Error(
          'Groq non ha restituito contenuto valido'
        );
      }

      try {
        return JSON.parse(rawContent);
      } catch (e) {
        throw new Error(
          `Impossibile parsare la risposta JSON di Groq: ${e.message}`
        );
      }
    }

    const errText = await response.text();

    // Gestione automatica del limite TPM di Groq.
    if (response.status === 429 && attempt < MAX_RETRIES) {
      let waitMs = 7000;

      try {
        const errorData = JSON.parse(errText);

        const message =
          errorData?.error?.message || '';

        const secondsMatch =
          message.match(
            /try again in ([0-9.]+)s/i
          );

        if (secondsMatch) {
          waitMs =
            Math.ceil(
              parseFloat(secondsMatch[1]) * 1000
            ) + 1000;
        }
      } catch (_) {
        // Se non riusciamo a leggere il JSON,
        // utilizziamo il tempo predefinito.
      }

      // Evita attese eccessivamente lunghe.
      waitMs = Math.min(
        Math.max(waitMs, 5000),
        15000
      );

      console.log(
        `[Groq] Rate limit 429. Tentativo ${
          attempt + 1
        }/${MAX_RETRIES}. Nuovo tentativo tra ${
          waitMs / 1000
        } secondi.`
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

function recordPriceSnapshot(productId, price) {
  if (
    !productId ||
    typeof price !== 'number'
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

  if (!last || last.date !== today) {
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

router.post('/', async (req, res) => {
  const { query, language } = req.body;

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

    // Se l'utente inserisce un link,
    // proviamo a risolverlo e a leggere la pagina.
    if (isUrl(resolvedQuery)) {
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
    }

    console.log(
      `[analyze] query finale mandata a Tavily: "${resolvedQuery}"`
    );

    // Ricerca molto più contenuta:
    // 3 risultati generali + 1 per negozio.
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
        title: pageExtract.title,
        url: query.trim(),
        content: pageExtract.content,
      });
    }

    console.log(
      `[analyze] risultati totali disponibili: ${tavilyResults.length}`
    );

    if (!tavilyResults.length) {
      return res.status(404).json({
        error: 'common.noResultsFound',
      });
    }

    // Limite molto più aggressivo:
    // massimo 4 risultati,
    // massimo 300 caratteri ciascuno.
    const searchResultsText =
      prepareResultsForGroq(
        tavilyResults,
        4,
        300
      );

    console.log(
      `[analyze] caratteri inviati a Groq: ${searchResultsText.length}`
    );

    const analysis =
      await callGroq(
        resolvedQuery,
        searchResultsText,
        language
      );

    if (
      analysis &&
      analysis.id &&
      typeof analysis.currentPrice === 'number'
    ) {
      const history =
        recordPriceSnapshot(
          analysis.id,
          analysis.currentPrice
        );

      analysis.priceHistory =
        history;
    }

    return res.json(analysis);

  } catch (err) {
    console.error(
      'Errore /api/analyze:',
      err.message
    );

    return res.status(500).json({
      error: 'common.analysisFailed',
      detail: err.message,
    });
  }
});

module.exports = router;
