const mongoose = require("mongoose")
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address:{
            type:String,
            required:true
        },
        stock:{
            type:Number,
            required:true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
    }
)

module.exports = mongoose.model("product", productSchema)