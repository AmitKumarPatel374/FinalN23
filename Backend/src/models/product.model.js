const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        currency: {
            type: String,
            enum: ['INR', 'USD'],
            default: 'INR'
        },
        amount: {
            type: Number,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    sizes: [
        {
            type: String,
            enum: ['s', 'm', 'l', 'xl', 'xxl'],
            default: 'm'
        }
    ],
    colors: [
        {
            type: String
        }
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const productModel=mongoose.model('products',productSchema);
module.exports=productModel;