// server/routes/customerStoryRoutes.js
const express = require('express');
const CustomerStory = require('../models/CustomerStory');
const router = express.Router();

// Get all customer stories
router.get('/', async (req, res) => {
  try {
    const stories = await CustomerStory.find();
    res.json(stories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a customer story
router.post('/', async (req, res) => {
  try {
    const story = new CustomerStory(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a customer story
router.put('/:id', async (req, res) => {
  try {
    const story = await CustomerStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(story);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a customer story
router.delete('/:id', async (req, res) => {
  try {
    await CustomerStory.findByIdAndDelete(req.params.id);
    res.send('Customer story deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
