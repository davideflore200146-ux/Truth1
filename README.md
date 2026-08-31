# TRUTH — App mobile + backend AI

"Don't just find the price. Find the truth."

Progetto completo: **app Expo/React Native** (frontend) + **backend Node.js** che chiama davvero
l'API gratuita di Gemini (Google) con ricerca web per analizzare i prodotti. Nessun dato finto: quando lo avvii con una
chiave API valida, l'analisi è reale.

## 0. Cosa ti serve prima di iniziare

- **Node.js 18 o superiore** installato → https://nodejs.org
- Una **chiave API Gemini gratuita** (nessuna carta di credito richiesta) → https://aistudio.google.com/apikey
  — accedi con un account Google, clicca "Create API key", copiala
- Il telefono e il computer sulla **stessa rete Wi-Fi** (per testare con Expo Go)

Il livello gratuito di Gemini include la ricerca Google integrata (fino a alcune migliaia di richieste
al mese, ben oltre quello che serve per provare l'app) — perfetto per sviluppo e uso personale, senza
spendere nulla.

## 1. Avvia il backend (il "cervello" di TRUTH)

```bash
cd backend
npm install
cp .env.example .env
```

Apri `.env` e incolla la tua chiave:
```
GEMINI_API_KEY=AIzaSy...la-tua-chiave-vera...
```

Poi avvia il server:
```bash
npm start
```

Dovresti vedere: `TRUTH backend in ascolto su http://0.0.0.0:3001`

**Trova l'IP del tuo computer sulla rete locale** (ti servirà al passo 2):
- Mac/Linux: `ifconfig | grep "inet "`
- Windows: `ipconfig` (cerca "Indirizzo IPv4")

## 2. Collega l'app a questo IP

Apri `src/api.js` e sostituisci l'indirizzo con il tuo:
```js
export const API_BASE_URL = 'http://192.168.1.23:3001'; // <-- il TUO IP, stessa porta
```

## 3. Avvia l'app

In un **nuovo terminale** (lascia il backend acceso in quello di prima):
```bash
npm install
npx expo start
```

Scansiona il QR code con **Expo Go** (iOS/Android), oppure premi `i` per il simulatore iOS o `a` per
l'emulatore Android.

Prova a cercare un prodotto vero (es. "Sony WH-1000XM6" o "iPhone 16") nella Home: l'app chiamerà il
tuo backend, che chiamerà Gemini con ricerca web reale, e in qualche secondo torna un'analisi vera.

## Cosa è reale e cosa è ancora da collegare

**Reale e funzionante:**
- Analisi prodotto con AI + ricerca web reale (`/api/analyze`), tramite Gemini (Google), gratuito per uso personale
- Verdetto, Truth Score, prezzo giusto, alternative, recensioni, TRUTH CHECK, offerte — tutto generato
  dal modello in base a ciò che trova online
- Storico prezzi mostrato **solo se l'AI lo trova davvero** (altrimenti l'app dice "dati non disponibili",
  come richiesto nella specifica — non inventa mai numeri)
- Wishlist e Cronologia salvate su file (`backend/data/db.json`), persistenti tra un riavvio e l'altro
- Chat "Chiedi a TRUTH" con risposte reali basate sull'analisi salvata

**Ancora mock o da costruire:**
- **Scansiona / Screenshot**: i pulsanti mostrano "presto disponibile" — servono `expo-camera` /
  `expo-image-picker` per catturare l'immagine, poi Gemini può analizzarla (l'API supporta le immagini)
- **Account e abbonamento TRUTH PLUS**: schermata statica, senza login né pagamenti veri (serve
  un provider come Stripe + autenticazione utenti)
- **Price Alert e notifiche push**: il bottone "Attiva" non fa ancora nulla — serve `expo-notifications`
  più un job schedulato lato backend che ricontrolli i prezzi periodicamente
- **Affiliate link reali**: i pulsanti "Vai" nelle offerte non aprono ancora URL veri — andranno
  collegati ai tuoi programmi affiliate una volta trovati i negozi
- **Database di produzione**: ora è un semplice file JSON (`backend/data/db.json`), perfetto per
  sviluppo/demo. Per produzione conviene passare a Postgres o MongoDB

## Limiti onesti da conoscere

- La ricerca web di Gemini è generalista (come una ricerca Google), non un'API dedicata di comparazione
  prezzi: per prodotti molto di nicchia o offerte lampo potrebbe non trovare dati aggiornati al minuto
- Non c'è ancora uno storico prezzi "vero" (tipo Keepa per Amazon): quando serve dato storico affidabile
  a lungo termine, valuta di integrare un servizio dedicato in `backend/services/`
- Ogni chiamata `/api/analyze` e `/api/chat` consuma la quota gratuita della tua chiave Gemini — per uso personale non dovresti mai avvicinarti al limite, ma se succede l'app mostrerà un errore chiaro invece di bloccarsi in silenzio

## Struttura del progetto

```
truth-app/
├── App.js                      ← naviga tra le schermate, chiama il backend
├── app.json                    ← configurazione Expo (icone, splash — già pronti)
├── src/
│   ├── api.js                   ← client HTTP verso il backend (⚠️ imposta qui il tuo IP)
│   ├── theme.js
│   ├── components/               (TruthDial, PriceChart, ChatModal, BottomNav, ui)
│   └── screens/                  (Home, Analyzing, ProductDetail, Wishlist, History, Account)
└── backend/
    ├── server.js                 ← avvia il server Express
    ├── db.js                     ← storage su file JSON
    ├── .env.example               ← copia in .env e inserisci la tua chiave Gemini gratuita
    ├── services/
    │   ├── gemini.js               ← chiamate reali a Gemini (con ricerca web, gratuito)
    │   └── prompts.js              ← i prompt che definiscono come TRUTH analizza e risponde
    └── routes/
        ├── analyze.js               ← POST /api/analyze
        ├── wishlist.js               ← GET/POST/DELETE /api/wishlist
        ├── history.js                ← GET /api/history
        └── chat.js                    ← POST /api/chat
```

## Prima di pubblicare in App Store / Play Store

- Sposta il backend su un hosting reale (Render, Railway, Fly.io…) invece che sul tuo computer, e
  aggiorna `API_BASE_URL` con l'URL pubblico
- Cambia `ios.bundleIdentifier` e `android.package` in `app.json` (ora `com.truthapp.mobile`, placeholder)
- Account Apple Developer (99$/anno) e Google Play Console (25$ una tantum)
- `eas build` (Expo Application Services) per generare i pacchetti da inviare agli store
- Aggiungi autenticazione utenti e limiti reali sul piano FREE (le "5 analisi al mese" ora non sono
  ancora fatte rispettare)
