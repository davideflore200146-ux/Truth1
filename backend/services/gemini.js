// Wrapper minimale per l'API Gemini (Google AI Studio) — livello gratuito, nessuna carta richiesta.
// Richiede Node 18+ (usa il "fetch" globale, nessuna libreria extra necessaria).
const MODEL = 'gemini-3.1-flash-lite';

async function callGemini({ system, userText, useSearch }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes('xxxxxxxx')) {
    throw new Error(
      'GEMINI_API_KEY non configurata. Copia backend/.env.example in backend/.env e inserisci la tua chiave gratuita da aistudio.google.com/apikey'
    );
  }

  const body = {
    contents: [{ role: 'user', parts: [{ text: userText }] }],
    system_instruction: { parts: [{ text: system }] },
  };
  if (useSearch) {
    body.tools = [{ google_search: {} }];
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API ha risposto ${res.status}: ${errText}`);
  }
  return res.json();
}

function extractText(response) {
  const parts = response.candidates?.[0]?.content?.parts || [];
  return parts
    .filter((p) => typeof p.text === 'string')
    .map((p) => p.text)
    .join('\n');
}

function parseJsonFromText(text) {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) {
    throw new Error("La risposta dell'AI non contiene un JSON valido.");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

module.exports = { callGemini, extractText, parseJsonFromText, MODEL };
