require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');

const analyzeRoute = require('./routes/analyze');
const wishlistRoute = require('./routes/wishlist');
const historyRoute = require('./routes/history');
const chatRoute = require('./routes/chat');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => res.send('TRUTH backend attivo.'));

app.use('/api/analyze', analyzeRoute);
app.use('/api/wishlist', wishlistRoute);
app.use('/api/history', historyRoute);
app.use('/api/chat', chatRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`TRUTH backend in ascolto su http://0.0.0.0:${PORT}`);
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('xxxxxxxx')) {
    console.warn('ATTENZIONE: GEMINI_API_KEY non configurata. Copia .env.example in .env e inserisci la tua chiave.');
  }
});
