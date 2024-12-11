// models/marketTrend.js

const mongoose = require('mongoose');

// Define the MarketTrend schema
const marketTrendSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    trend: {
        type: String,  // e.g., "Bull", "Bear", "Neutral"
        required: true,
    },
    overallIndex: {
        type: Number,  // A numerical value representing market index (e.g., S&P 500)
        required: true,
    },
});

// Create and export the MarketTrend model
const MarketTrend = mongoose.model('MarketTrend', marketTrendSchema);
module.exports = MarketTrend;
