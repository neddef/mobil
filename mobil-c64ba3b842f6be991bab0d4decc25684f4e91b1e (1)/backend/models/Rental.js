const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  dailyPrice: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  fuel: {
    type: String,
    required: true,
    enum: ['Benzin', 'Dizel', 'LPG', 'Elektrik', 'Hibrit']
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manuel', 'Otomatik', 'Yarı Otomatik']
  },
  description: {
    type: String
  },
  features: [{
    type: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  rentals: [{
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    totalPrice: {
      type: Number
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Rental', RentalSchema); 