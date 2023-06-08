const mongoose = require("mongoose")

const addToCartSchema = mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
},{
    timestamps: true
})

AddToCart = mongoose.model("addToCart",addToCartSchema)

module.exports = AddToCart