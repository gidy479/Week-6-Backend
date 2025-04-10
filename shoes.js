const express = require('express');
const router = express.Router();
const Shoe = require('../model');

// Save a new shoe
router.post('/', async (req, res) => {
  try {
    const shoe = new Shoe(req.body);
    await shoe.save();
    res.status(201).json(shoe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all shoes
router.get('/', async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific shoe based on URL param (e.g., /shoes/men)
router.get('/:category', async (req, res) => {
  try {
    const shoe = await Shoe.findOne({ category: req.params.category });
    if (!shoe) return res.status(404).json({ message: 'Shoe not found' });
    res.json(shoe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
