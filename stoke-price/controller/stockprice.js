// controllers/stockPriceController.js

const StockPrice = require('../modal/stockprice');
const Stock = require('../modal/stock'); // Assuming you have a Stock model
const { now } = require('mongoose');

// Create a new stock price record
exports.createStockPrice = async (req, res) => {
    const { stockId, open, close, high, low, volume } = req.body;

    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        const date = new Date(); 

        // Create a new StockPrice object
        const stockPrice = new StockPrice({
            stock: stockId,
            date,
            open,
            close,
            high,
            low,
            volume
        });
        
        console.log(stockPrice);
        await stockPrice.save();
        res.status(201).json({ message: 'Stock price added successfully', stockPrice });
    } catch (error) {
        res.status(500).json({ message: 'Error saving stock price', error });
    }
};

// Get all stock prices for a specific stock
exports.getStockPricesByStockId = async (req, res) => {

    try {
        const stockPrices = await StockPrice.find() .populate({
            path: "stock",
            populate: {
                path: "company", // Populating the company field within stock
                model: "Company"  // Specify the model for company
            }
        });
        res.status(200).json(stockPrices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock prices', error });
    }
};
