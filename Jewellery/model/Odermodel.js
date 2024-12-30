const mongoose = require('mongoose')

const OderSchema = new mongoose.Schema({

   CustomerId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "CUSTOMER" ,
    required : true
   },
   Totalamount : {
    type : Number,
    required : true
   }
}) 
module.exports = mongoose.model('ODER' , OderSchema)