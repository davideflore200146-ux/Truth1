function genHistory(points, base, amp, seedOffset) {
  return Array.from({ length: points }, (_, i) => {
    const noise = Math.sin(i * 0.7 + seedOffset) * amp + Math.sin(i * 0.21 + seedOffset) * (amp * 0.4);
    return { i, price: Math.round(base + noise) };
  });
}

export const HISTORY = {
  '30gg': genHistory(30, 330, 22, 1),
  '3 mesi': genHistory(24, 335, 30, 2),
  '6 mesi': genHistory(26, 340, 35, 3),
  '1 anno': genHistory(24, 345, 45, 4),
};

export const PRODUCT = {
  id: 'sony-wh1000xm6',
  name: 'Sony WH-1000XM6',
  brand: 'Sony',
  category: 'Cuffie wireless',
  score: 82,
  verdict: 'wait',
  currentPrice: 349,
  fairMin: 299,
  fairMax: 319,
  savings: 50,
  reasoning:
    "Il prodotto è valido, ma 349€ è superiore alla sua media recente. Negli ultimi mesi è stato venduto frequentemente tra 299€ e 319€. Se non hai fretta, aspetterei.",
  alternatives: [
    { name: 'Bose QuietComfort Ultra', price: 279, score: 78, note: 'Costa 70€ in meno e offre prestazioni simili, ma ha una batteria inferiore.' },
    { name: 'Sony WH-1000XM5', price: 259, score: 80, note: "Modello precedente, quasi identico nell'uso quotidiano, spesso in offerta." },
    { name: 'Sennheiser Momentum 4', price: 299, score: 76, note: 'Autonomia record, ma app companion meno curata.' },
  ],
  reviews: {
    positive: ['qualità audio', 'comfort', 'autonomia'],
    issues: ['microfono', 'connessione', 'app companion'],
    insight: 'Il problema più frequentemente segnalato riguarda il microfono durante le chiamate.',
  },
  truthCheck: [
    { ok: false, text: 'Il prezzo dichiarato come "-40%" non sembra particolarmente conveniente rispetto allo storico recente.' },
    { ok: true, text: "Nessuna versione o capacità diversa rilevata rispetto all'annuncio." },
    { ok: true, text: 'Venditore verificato, garanzia standard inclusa.' },
  ],
  offers: [
    { store: 'Amazon', price: 349, shipping: 'Gratis', total: 349 },
    { store: 'MediaWorld', price: 339, shipping: '4,99€', total: 343.99 },
    { store: 'Unieuro', price: 359, shipping: 'Gratis', total: 359 },
  ],
};

export const HISTORY_ITEMS = [
  { name: 'Sony WH-1000XM6', verdict: 'wait', price: 399 },
  { name: 'iPhone 17', verdict: 'buy', price: 899 },
  { name: 'TV Samsung QN90', verdict: 'avoid', price: 1099 },
];

export const CHAT_PRESETS = [
  { q: 'Perché dici che dovrei aspettare?', a: 'Perché negli ultimi mesi questo modello è stato venduto tra 299€ e 319€ più volte: il prezzo attuale di 349€ è sopra la sua media recente, senza un motivo che lo giustifichi.' },
  { q: "Qual è l'alternativa migliore?", a: "Le Bose QuietComfort Ultra: 70€ in meno con prestazioni molto simili. Il compromesso è un'autonomia leggermente inferiore." },
  { q: 'E se il prezzo scendesse a 300€?', a: 'A 300€ saresti proprio dentro la fascia che consideriamo conveniente: il verdetto passerebbe da "Aspetta" a "Compra".' },
];
