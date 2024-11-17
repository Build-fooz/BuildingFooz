const express = require("express");

// Importing controller functions for handling product routes
const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/products-controller");

const router = express.Router();

//fetching filtered products
router.get("/get", getFilteredProducts);

//fetching details product by ID
router.get("/get/:id", getProductDetails);

module.exports = router;
