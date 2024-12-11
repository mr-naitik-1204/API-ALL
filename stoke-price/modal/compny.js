// models/company.js

const mongoose = require('mongoose');

// Define the Company schema
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true,  // Stock symbol, e.g., AAPL for Apple
    },
    industry: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        required: true,
    },
    marketCap: {
        type: Number,
        required: true,
    },
});

// Create and export the Company model
const Company = mongoose.model('Company', companySchema);
module.exports = Company;
