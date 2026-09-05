// backend/db.js
//
// Storage semplice basato su file JSON. Comodo per lo sviluppo/MVP.
// Per produzione, sostituiscilo con Postgres/MongoDB mantenendo la stessa interfaccia
// (read() / write(data)).

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'db.json');

function ensure() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify({ analyses: [], wishlist: [], priceHistory: {} }, null, 2)
    );
  }
}

function read() {
  ensure();
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  if (!data.priceHistory) data.priceHistory = {}; // compatibilità con db.json vecchi
  return data;
}

function write(data) {
  ensure();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { read, write };
