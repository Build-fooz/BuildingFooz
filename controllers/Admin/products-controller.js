// Importing the Product model to interact with the product collection in MongoDB.
const Product = require("../../models/Product");

// Importing image upload utility function from the cloudinary helper.
const { imageUploadUtil } = require("../../helpers/cloudinary"); 

// Function to handle image upload.
// This function receives an image file in the request, converts it to a base64 string,
// then uses the Cloudinary utility to upload it and returns the result to the client.
const handleImageUpload = async (req, res) => {
  try {
    // Convert image buffer to base64 encoding.
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload the image to Cloudinary.
    const result = await imageUploadUtil(url);

    // Send the Cloudinary response back to the client.
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    // Send an error message if the upload fails.
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to add a new product.
const addProduct = async (req, res) => {
  try {
    // Destructure product data from the request body.
    const {
      image,
      title,
      description,
      category, 
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Create a new product instance.
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    // Save the product to the database.
    await newlyCreatedProduct.save();

    // Send a success response with the newly created product data.
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    // Send an error message if saving fails.
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to fetch all products.
const fetchAllProducts = async (req, res) => {
  try {
    // Find all products in the database.
    const listOfProducts = await Product.find({});

    // Send a success response with the list of products.
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    // Send an error message if fetching fails.
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to edit an existing product.
// It updates the product's information based on the provided product ID and request body data.
const editProduct = async (req, res) => {
  try {
    // Retrieve product ID from URL parameters and new data from the request body.
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Find the product in the database by ID.
    let findProduct = await Product.findById(id);

    // Check if the product exists.
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update the product's fields if new data is provided; otherwise, retain the existing values.
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    // Save the updated product to the database.
    await findProduct.save();

    // Send a success response with the updated product data.
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    // Send an error message if updating fails.
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Function to delete a product.
// It removes a product from the database based on the provided product ID.
const deleteProduct = async (req, res) => {
  try {
    // Retrieve product ID from URL parameters.
    const { id } = req.params;

    // Find and delete the product by ID.
    const product = await Product.findByIdAndDelete(id);

    // Check if the product existed and was deleted.
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Send a success response indicating the product was deleted.
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    // Send an error message if deletion fails.
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Exporting each function to be used in the routes.
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
