const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
 
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
