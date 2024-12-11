

// const MarketTrend = require('../modal/markettrend');
const StockPrice = require('../modal/stockprice');

exports.getMarketTrends = async (req, res) => {
    try {
        const data = await StockPrice.find().populate({
            path: "stock",
            populate: {
                path: "company", 
                model: "Company"  
            }
        });
        console.log(data);
   
        data.sort((a, b) => b.high - a.high);
        console.log(data);
        res.status(200).json({ message: 'Market trend added successfully', data });
    } catch (error) {
        res.status(500).json({ message: 'Error saving market trend', error });
    }
};

