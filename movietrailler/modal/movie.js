const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    releaseYear: {
        type: Number
    },
    trailerUrl: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"loginsingup"
    }
});

module.exports = mongoose.model('Movie', movieSchema);
