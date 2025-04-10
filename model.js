const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: String,
  category: String,
  size: Number,
  price: Number
});

module.exports = mongoose.model('Shoe', shoeSchema);
