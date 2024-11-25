import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    images: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salesPrice: {
        type: Number,
        required: true
    },
    totalStock: {
        type: Number,
        required: true
    },
    averageReview: {
        type: Number,
        required: true
    }



}, { timestamps: true })


const Product = mongoose.model("Product", ProductSchema);

export default Product;