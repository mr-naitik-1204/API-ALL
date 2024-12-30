const mongoose = require('mongoose')

const JewellerySchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    Price : {
        type : Number,
        required : true
    },
    material : {
        type : String,
        required : true
    },
    weight : {
        type : Number,
        required : true
    },
    availableStock : {
        type : String,
        required : true
    }
}) 

module.exports = mongoose.model('JEWELLERY' , JewellerySchema)