// models/stockPrice.js

const mongoose = require('mongoose');

// Define the StockPrice schema
const stockPriceSchema = new mongoose.Schema({
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',  // Reference to the Stock model
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    open: {
        type: Number,
        required: true,
    },
    close: {
        type: Number,
        required: true,
    },
    high: {
        type: Number,
        required: true,
    },
    low: {
        type: Number,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
});

// Create and export the StockPrice model
const StockPrice = mongoose.model('StockPrice', stockPriceSchema);
module.exports = StockPrice;
