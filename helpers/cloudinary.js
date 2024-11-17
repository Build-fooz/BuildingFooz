const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dxgo4hdmc",
  api_key: "472928269377437",
  api_secret: "JjazP63JeUwlFE4Q4K5pIchOOKA",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Simple upload function with try-catch for error handling
async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log("Upload Error:", error.message);
    throw error;
  }
}

module.exports = { upload, imageUploadUtil };
