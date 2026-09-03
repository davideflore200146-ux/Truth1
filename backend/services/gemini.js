// Wrapper per Groq API.
// Manteniamo gli stessi nomi delle funzioni usate dal backend,
// così non dobbiamo modificare il resto di TRUTH.

const MODEL = 'openai/gpt-oss-120b';

async function callGemini({ system, userText, useSearch }) {
  // Per evitare di dover modificare subito Render,
  // utilizziamo la variabile che abbiamo già configurato:
  // GEMINI_API_KEY contiene ora la chiave Groq.
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.includes('xxxxxxxx')) {
    throw new Error(
      'Chiave Groq non configurata. Controlla GEMINI_API_KEY su Render.'
    );
  }

  const body = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content: system,
      },
      {
        role: 'user',
        content: userText,
      },
    ],
    response_format: {
      type: 'json_object',
    },
    temperature: 0.2,
  };

  const res = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API ha risposto ${res.status}: ${errText}`);
  }

  const data = await res.json();

  // Convertiamo la risposta Groq nel formato che il vecchio
  // codice TRUTH si aspetta da Gemini.
  return {
    candidates: [
      {
        content: {
          parts: [
            {
              text: data.choices?.[0]?.message?.content || '',
            },
          ],
        },
      },
    ],
  };
}

function extractText(response) {
  const parts = response.candidates?.[0]?.content?.parts || [];

  return parts
    .filter((p) => typeof p.text === 'string')
    .map((p) => p.text)
    .join('\n');
}

function parseJsonFromText(text) {
  const cleaned = text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error("La risposta dell'AI non contiene un JSON valido.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

module.exports = {
  callGemini,
  extractText,
  parseJsonFromText,
  MODEL,
};
