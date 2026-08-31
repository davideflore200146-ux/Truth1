const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const data = db.read();
  res.json(data.wishlist);
});

router.post('/', (req, res) => {
  const { product } = req.body;
  if (!product || !product.id) {
    return res.status(400).json({ error: 'Prodotto non valido: manca "id".' });
  }
  const data = db.read();
  if (!data.wishlist.find((p) => p.id === product.id)) {
    data.wishlist.unshift(product);
    db.write(data);
  }
  res.json(data.wishlist);
});

router.delete('/:id', (req, res) => {
  const data = db.read();
  data.wishlist = data.wishlist.filter((p) => p.id !== req.params.id);
  db.write(data);
  res.json(data.wishlist);
});

module.exports = router;
