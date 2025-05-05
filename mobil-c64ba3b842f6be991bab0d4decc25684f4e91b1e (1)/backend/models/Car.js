const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  km: {
    type: Number,
    required: true
  },
  fuel: {
    type: String,
    required: true,
    enum: ['Benzin', 'Dizel', 'LPG', 'Elektrik', 'Hibrit']
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isNew: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  description: {
    type: String,
    required: false
  },
  features: [{
    type: String
  }],
  color: {
    type: String,
    required: false
  },
  transmission: {
    type: String,
    enum: ['Manuel', 'Otomatik', 'Yarı Otomatik'],
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', CarSchema); 