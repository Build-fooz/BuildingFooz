const Product = require("../../models/Product");

// Get filtered products based on query parameters
const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query; // Extract filters and sort criteria from query

    let filters = {}; 

    // Filter products by category if specified
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    // Filter products by brand if specified
    if (brand.length) {
      filters.brand = { $in: brand.split(",") }; 
    }

    let sort = {}; 

    // Determine sorting order based on the sortBy parameter
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1; //ascending order
        break;
      case "price-hightolow":
        sort.price = -1; //descending order
        break;
      case "title-atoz":
        sort.title = 1; //(A to Z)
        break;
      case "title-ztoa":
        sort.title = -1; // reverse alphabetical order (Z to A)
        break;
      default:
        sort.price = 1; // Default sorting by price in ascending order
        break;
    }

    // Fetch products from the database with the applied filters and sorting
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products, 
    });
  } catch (e) {
    console.log(e); 
    res.status(500).json({
      success: false,
      message: "Some error occurred", 
    });
  }
};

// Get detailed information about a single product by ID
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the route parameters
    const product = await Product.findById(id); // Fetch product details by ID

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!", // Handle case when the product does not exist
      });

    res.status(200).json({
      success: true,
      data: product, 
    });
  } catch (e) {
    console.log(e); 
    res.status(500).json({
      success: false,
      message: "Some error occurred", 
    });
  }
};


module.exports = { getFilteredProducts, getProductDetails };
