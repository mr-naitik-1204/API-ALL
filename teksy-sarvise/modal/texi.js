const mongoose = require('mongoose');

const taxiSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    driverName: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'on_trip'],
        default: 'available',
    },
    ratings: {
        type: Number,
        min: 1,
        max: 5
    },
});

taxiSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Taxi', taxiSchema);
