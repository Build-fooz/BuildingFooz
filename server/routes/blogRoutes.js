// server/routes/blogRoutes.js
const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a blog post
router.post('/', async (req, res) => {
  try {
    const blog = new BlogPost(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a blog post
router.put('/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.send('Blog post deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
