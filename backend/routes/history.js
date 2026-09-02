const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const data = db.read();
  res.json(data.analyses);
});

module.exports = router;
