const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'dealer'],
    default: 'user'
  },
  favorites: {
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }],
    rentals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema); 