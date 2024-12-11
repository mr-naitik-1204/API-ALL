// routes/marketTrendRoutes.js

const express = require('express');
const MK = require('../controller/markettrend');
const router = express.Router();

// Create a new market trend
router.get('/marketTrends', MK.getMarketTrends);

// Get all market trends
// router.get('/marketTrends/get', MK.getMarketTrends);

module.exports = router;
