const mongoose = require("mongoose");

// Define the schema for products with relevant fields and types
const ProductSchema = new mongoose.Schema(
  {
    image: String, 
    title: String, 
    description: String, 
    category: String, 
    price: Number, 
    salePrice: Number, 
    totalStock: Number, 
    averageReview: Number, 
  },
  { timestamps: true } // Automatically manage creation and update timestamps
);

module.exports = mongoose.model("Product", ProductSchema);
