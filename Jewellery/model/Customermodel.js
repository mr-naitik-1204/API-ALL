const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    JewelleryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "JEWELLERY",
        required : true
     },
    CustomerName : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    mobileNo : {
        type : Number,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
}) 

module.exports = mongoose.model('CUSTOMER' , CustomerSchema)