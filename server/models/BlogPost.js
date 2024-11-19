// server/models/BlogPost.js
const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String, // Optional image URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
