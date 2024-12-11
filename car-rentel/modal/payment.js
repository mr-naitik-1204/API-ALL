const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    rentalid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'cash'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed'
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
