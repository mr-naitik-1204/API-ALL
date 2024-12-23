const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busType: {
    type: String,
    required: true,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Deluxe'],
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
