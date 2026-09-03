import i18n from './i18n';

// Cambia questo indirizzo con l'IP del computer che esegue "npm start" dentro /backend
// sulla tua rete Wi-Fi (NON "localhost": sul telefono punterebbe al telefono stesso).
// Per trovarlo: su Mac/Linux "ifconfig | grep inet", su Windows "ipconfig".
// Esempio: 'http://192.168.1.23:3001'
export const API_BASE_URL = 'https://truth1.onrender.com';

async function request(path, options = {}) {
let res;

try {
res = await fetch(`${API_BASE_URL}${path}`, {
headers: { 'Content-Type': 'application/json' },
...options,
});
} catch (err) {
throw new Error(
`Impossibile contattare il backend su ${API_BASE_URL}. È avviato? È il tuo telefono sulla stessa rete Wi-Fi del computer?`
);
}

const body = await res.json().catch(() => ({}));

if (!res.ok) {
throw new Error(body.error || `Errore ${res.status}`);
}

return body;
}

export const analyzeProduct = (query) =>
request('/api/analyze', {
method: 'POST',
body: JSON.stringify({
query,
language: i18n.language,
}),
});

export const getWishlist = () => request('/api/wishlist');

export const addToWishlist = (product) =>
request('/api/wishlist', {
method: 'POST',
body: JSON.stringify({ product }),
});

export const removeFromWishlist = (id) =>
request(`/api/wishlist/${id}`, { method: 'DELETE' });

export const getHistory = () => request('/api/history');

export const sendChatMessage = (analysisId, question) =>
request('/api/chat', {
method: 'POST',
body: JSON.stringify({
analysisId,
question,
language: i18n.language,
}),
});
