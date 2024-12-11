// routes/stockPriceRoutes.js
// 3
const express = require('express');
const SP = require('../controller/stockprice');
const router = express.Router();

// Create a new stock price record
router.post('/stockPrices', SP.createStockPrice);

// Get all stock prices for a specific stock
router.get('/stockPrices/stock', SP.getStockPricesByStockId);

module.exports = router;
