// server/models/CustomerStory.js
const mongoose = require('mongoose');

const CustomerStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  story: { type: String, required: true },
  image: String, // Optional customer image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CustomerStory', CustomerStorySchema);
