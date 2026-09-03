const express = require('express');

const router = express.Router();

const {
  callGemini,
  extractText,
  parseJsonFromText,
} = require('../services/gemini');

const {
  searchTavily,
  formatTavilyResults,
} = require('../services/tavily');

const {
  ANALYSIS_SYSTEM_PROMPT,
} = require('../services/prompts');

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

  const normalized =
    language
      .toLowerCase()
      .split('-')[0]
      .trim();

  return SUPPORTED_LANGUAGES[normalized]
    ? normalized
    : 'it';
}

function normalize(data, query) {
  const safe =
    data && typeof data === 'object'
      ? data
      : {};

  return {
    id:
      safe.id ||
      String(query || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),

    name:
      safe.name ||
      query ||
      'Prodotto',

    brand:
      typeof safe.brand === 'string'
        ? safe.brand
        : '',

    category:
      typeof safe.category === 'string'
        ? safe.category
        : '',

    score:
      typeof safe.score === 'number'
        ? Math.max(0, Math.min(100, safe.score))
        : 0,

    verdict:
      ['buy', 'wait', 'avoid'].includes(
        safe.verdict
      )
        ? safe.verdict
        : 'wait',

    currentPrice:
      typeof safe.currentPrice === 'number'
        ? safe.currentPrice
        : null,

    fairMin:
      typeof safe.fairMin === 'number'
        ? safe.fairMin
        : null,

    fairMax:
      typeof safe.fairMax === 'number'
        ? safe.fairMax
        : null,

    savings:
      typeof safe.savings === 'number'
        ? safe.savings
        : null,

    reasoning:
      typeof safe.reasoning === 'string'
        ? safe.reasoning
        : '',

    alternatives:
      Array.isArray(safe.alternatives)
        ? safe.alternatives.slice(0, 3)
        : [],

    reviews: {
      positive:
        Array.isArray(safe.reviews?.positive)
          ? safe.reviews.positive.slice(0, 3)
          : [],

      issues:
        Array.isArray(safe.reviews?.issues)
          ? safe.reviews.issues.slice(0, 3)
          : [],

      insight:
        typeof safe.reviews?.insight === 'string'
          ? safe.reviews.insight
          : '',
    },

    truthCheck:
      Array.isArray(safe.truthCheck)
        ? safe.truthCheck.slice(0, 4)
        : [],

    offers:
      Array.isArray(safe.offers)
        ? safe.offers.slice(0, 4)
        : [],

    ...(safe.priceHistory &&
    typeof safe.priceHistory === 'object'
      ? {
          priceHistory:
            safe.priceHistory,
        }
      : {}),
  };
}

function buildSearchQuery(query) {
  const cleanQuery =
    query.trim();

  // Le virgolette aiutano a mantenere
  // l'identità esatta del modello.
  return [
    `"${cleanQuery}"`,
    'prezzo',
    'disponibilità',
    'recensioni',
    'offerte',
    'specifiche',
    'data uscita',
    'ufficiale',
  ].join(' ');
}

function buildUserText({
  query,
  currentDate,
  languageName,
  selectedLanguage,
  searchContext,
}) {
  const baseInstructions = `Analizza questo prodotto/offerta esatto:

${query}

DATA CORRENTE REALE:
${currentDate}

LINGUA RICHIESTA DALL'UTENTE:
${languageName} (${selectedLanguage})

ISTRUZIONI CRITICHE:

1. IDENTITÀ ESATTA
Il prodotto richiesto è esattamente:
"${query}"

Non sostituirlo con:
- una generazione precedente;
- una generazione successiva;
- una variante Pro;
- una variante Pro Max;
- una variante Plus;
- una variante Ultra;
- un modello con capacità diversa;
- un prodotto semplicemente simile.

Se trovi informazioni su un modello simile ma diverso, NON usarle come se fossero informazioni sul prodotto richiesto.

2. DATA
La data corrente reale è:
${currentDate}

Usa questa data per stabilire se il prodotto:
- è stato annunciato;
- è stato presentato;
- è stato rilasciato;
- è disponibile;
- è esaurito;
- è fuori produzione.

Non dichiarare che un prodotto non esiste o non è ancora uscito soltanto perché una fonte non contiene informazioni sufficienti.

3. FONTI
Dai priorità alle fonti ufficiali del produttore per:
- identità;
- data di presentazione;
- data di uscita;
- specifiche;
- prezzo ufficiale.

Per prezzi e offerte usa anche rivenditori affidabili.

4. LINGUA
Tutti i testi generati devono essere esclusivamente nella lingua richiesta.

Non usare italiano se la lingua richiesta è diversa.

Mantieni invariati:
- le chiavi JSON;
- "buy";
- "wait";
- "avoid".

`;

  if (!searchContext) {
    return `${baseInstructions}

Non sono stati ottenuti risultati web sufficienti.

Non inventare dati.
Se un dato non è verificabile, usa null, array vuoto o stringa vuota come previsto dallo schema.
`;
  }

  return `${baseInstructions}

RISULTATI DI RICERCA WEB AGGIORNATI:

${searchContext}

VALUTAZIONE DELLE FONTI:

I risultati sopra possono contenere:
- fonti ufficiali;
- rivenditori;
- recensioni;
- pagine obsolete;
- risultati relativi a modelli simili.

Devi confrontarli e determinare quale fonte riguarda realmente il prodotto richiesto.

Se una fonte parla di una generazione diversa, NON usarla per identificare il prodotto richiesto.

Se una fonte ufficiale conferma l'esistenza, la presentazione o la disponibilità del prodotto richiesto, questa informazione ha priorità sulla conoscenza interna del modello.
`;
}

router.post('/', async (req, res) => {
  try {
    const {
      query,
      language,
    } = req.body || {};

    if (
      !query ||
      typeof query !== 'string' ||
      !query.trim()
    ) {
      return res.status(400).json({
        error: 'Query mancante',
      });
    }

    const cleanQuery =
      query.trim();

    const selectedLanguage =
      normalizeLanguage(language);

    const languageName =
      SUPPORTED_LANGUAGES[
        selectedLanguage
      ];

    const currentDate =
      new Date()
        .toISOString()
        .slice(0, 10);

    let searchContext = '';

    try {
      const searchQuery =
        buildSearchQuery(
          cleanQuery
        );

      const tavilyData =
        await searchTavily(
          searchQuery,
          {
            searchDepth: 'advanced',
            maxResults: 10,
          }
        );

      searchContext =
        formatTavilyResults(
          tavilyData
        );

      console.log(
        `[TRUTH] Ricerca completata per "${cleanQuery}". Fonti: ${
          Array.isArray(tavilyData?.results)
            ? tavilyData.results.length
            : 0
        }`
      );
    } catch (searchError) {
      console.error(
        '[TRUTH] Errore ricerca Tavily:',
        searchError
      );
    }

    const userText =
      buildUserText({
        query: cleanQuery,
        currentDate,
        languageName,
        selectedLanguage,
        searchContext,
      });

    const localizedSystemPrompt =
      `${ANALYSIS_SYSTEM_PROMPT}

DATA CORRENTE REALE:
${currentDate}

Questa data è il riferimento temporale assoluto dell'analisi.

LINGUA OBBLIGATORIA:
${languageName} (${selectedLanguage})

REGOLA IDENTITÀ PRODOTTO:

Quando l'utente specifica un modello preciso, devi analizzare ESATTAMENTE quel modello.

Non sostituire mai automaticamente:
- una generazione con un'altra;
- un modello con il suo predecessore;
- un modello con il suo successore;
- una variante con un'altra variante;
- un prodotto specifico con la famiglia generica.

Se le fonti web mostrano informazioni contrastanti, devi risolvere il conflitto usando:
1. fonte ufficiale del produttore;
2. fonte più recente;
3. rivenditore affidabile;
4. altre fonti attendibili.

REGOLA DATA:

Non usare la conoscenza interna del modello come unica fonte per stabilire se un prodotto recente esiste, è stato presentato o è disponibile.

Usa prima i risultati web forniti.

Se una fonte ufficiale conferma che il prodotto è stato presentato o commercializzato, considera questa informazione prioritaria.

REGOLA PREZZO:

Non attribuire al prodotto richiesto il prezzo di una variante diversa.

REGOLA INFORMAZIONI NON VERIFICATE:

Se un'informazione non è verificabile:
- non inventarla;
- usa null;
- usa array vuoto;
- usa stringa vuota;
- oppure spiega brevemente l'incertezza nel reasoning.

REGOLA LINGUA:

Tutti i testi generati devono essere esclusivamente nella lingua richiesta.

Non tradurre:
- le chiavi JSON;
- "buy";
- "wait";
- "avoid".

Restituisci esclusivamente JSON valido.
Nessun testo prima o dopo il JSON.`;

    const response =
      await callGemini({
        system:
          localizedSystemPrompt,
        userText,
        useSearch: false,
      });

    const text =
      extractText(response);

    const parsed =
      parseJsonFromText(text);

    const analysis =
      normalize(
        parsed,
        cleanQuery
      );

    try {
      if (
        db &&
        typeof db.saveAnalysis ===
          'function'
      ) {
        await db.saveAnalysis(
          analysis
        );
      }
    } catch (dbError) {
      console.error(
        '[TRUTH] Errore salvataggio analisi:',
        dbError
      );
    }

    return res.json(
      analysis
    );
  } catch (error) {
    console.error(
      '[TRUTH] Errore analisi:',
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        'Errore durante l’analisi',
    });
  }
});

module.exports = router;
