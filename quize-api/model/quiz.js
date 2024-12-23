const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userquizz',
        required: true,
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questionSchema',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports=mongoose.model('quizSchema',quizSchema );
