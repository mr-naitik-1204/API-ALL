// routes/stockRoutes.js
// 2
const express = require('express');
const ST = require('../controller/stock');
const router = express.Router();

router.post('/stockscreat', ST.creatStock);
router.get('/getstok', ST.getStock);

module.exports = router;
