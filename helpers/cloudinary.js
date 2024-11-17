const cloudinary = require("cloudinary").v2; // Cloudinary for image storage and management
const multer = require("multer"); // Multer for handling file uploads

// Configure Cloudinary with account-specific credentials
cloudinary.config({
  cloud_name: "dxgo4hdmc", //cloud name
  api_key: "472928269377437", // API key for authentication
  api_secret: "JjazP63JeUwlFE4Q4K5pIchOOKA", // API secret for secure access
});

// Set up Multer storage to store files temporarily in memory
const storage = multer.memoryStorage();
const upload = multer({ storage }); // Multer middleware for handling file uploads

// Utility function to handle image uploads to Cloudinary
async function imageUploadUtil(file) {
  try {
    // Upload the file to Cloudinary and allow any resource type
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically detect file type (image, video, etc.)
    });
    return result; 
  } catch (error) {
    console.log("Upload Error:", error.message); 
    throw error; // Rethrow the error to be handled by the caller
  }
}


module.exports = { upload, imageUploadUtil };
