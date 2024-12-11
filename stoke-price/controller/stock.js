// controllers/stockController.js

const Stock = require('../modal/stock');

// Get a stock by company symbol
exports.getStock = async (req, res) => {


    try {
        const stock = await Stock.find().populate('company');
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found for the given symbol.' });
        }
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stock.', error: err });
    }
};
exports.creatStock = async (req, res) => {
    try {
        const { symbol, company } = req.body
        const stock = await Stock.create({ symbol, company });
        if (!stock) {
            return res.status(404).json({ message: 'Stock not create .' });
        }
        res.status(201).json(stock);
    } catch (err) {
        res.status(500).json({ message: 'Error create stock.', error: err });
    }
};

