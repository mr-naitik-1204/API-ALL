const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
