// models/stock.js

const mongoose = require('mongoose');

// Define the Stock schema
const stockSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Assuming 'Company' is another model
    // other fields...
});

// Create and export the Stock model
const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
