const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
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
    tripHistory: [
        {
            taxiId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Taxi'
            },
            startTime: {
                type: Date,
                default: Date.now
            },
            endTime: Date,
            distance: Number, // in km
            fare: Number,
        },
    ],
});

userSchema.index({ location: '2dsphere' }); // Geo-index for location-based searches

module.exports = mongoose.model('User', userSchema);
