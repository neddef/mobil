const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  compatibleModels: [{
    type: String
  }],
  description: {
    type: String
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Part', PartSchema); 