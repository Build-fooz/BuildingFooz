// server/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete a product
router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).send("Product not found");
      res.status(200).send("Product deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Update a product
  router.put('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) return res.status(404).send("Product not found");
      res.json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
