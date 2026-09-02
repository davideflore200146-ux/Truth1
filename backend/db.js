// Storage semplice basato su file JSON. Comodo per lo sviluppo/MVP:
// nessuna dipendenza nativa da compilare, nessun server di database da avviare.
// Per produzione, sostituiscilo con Postgres/MongoDB mantenendo la stessa interfaccia
// (read() / write(data)).
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'db.json');

function ensure() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ analyses: [], wishlist: [] }, null, 2));
  }
}

function read() {
  ensure();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function write(data) {
  ensure();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { read, write };
