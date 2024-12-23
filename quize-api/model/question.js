const mongoose =require('mongoose')

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    // quiz: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'quizSchema',
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports=mongoose.model('questionSchema',questionSchema );
