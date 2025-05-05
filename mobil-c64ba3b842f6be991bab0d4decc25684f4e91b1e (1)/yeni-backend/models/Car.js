const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Marka gereklidir'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model gereklidir'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Üretim yılı gereklidir'],
    min: [1900, 'Üretim yılı 1900\'den küçük olamaz'],
    max: [new Date().getFullYear() + 1, `Üretim yılı ${new Date().getFullYear() + 1}'den büyük olamaz`]
  },
  color: {
    type: String,
    required: [true, 'Renk gereklidir']
  },
  price: {
    type: Number,
    required: [true, 'Fiyat gereklidir'],
    min: [0, 'Fiyat negatif olamaz']
  },
  dailyRentalRate: {
    type: Number,
    required: [true, 'Günlük kiralama ücreti gereklidir'],
    min: [0, 'Günlük kiralama ücreti negatif olamaz']
  },
  transmission: {
    type: String,
    enum: ['Manuel', 'Otomatik', 'Yarı Otomatik'],
    default: 'Manuel'
  },
  fuelType: {
    type: String,
    enum: ['Benzin', 'Dizel', 'LPG', 'Elektrik', 'Hibrit'],
    default: 'Benzin'
  },
  mileage: {
    type: Number,
    min: [0, 'Kilometre negatif olamaz'],
    default: 0
  },
  seats: {
    type: Number,
    min: [1, 'Koltuk sayısı en az 1 olmalıdır'],
    max: [50, 'Koltuk sayısı en fazla 50 olabilir'],
    default: 5
  },
  features: {
    type: [String],
    default: []
  },
  available: {
    type: Boolean,
    default: true
  },
  images: {
    type: [String],
    default: ['default-car.jpg']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Açıklama 1000 karakterden fazla olamaz']
  },
  location: {
    type: String,
    default: 'İstanbul'
  },
  licensePlate: {
    type: String,
    unique: true,
    required: [true, 'Plaka numarası gereklidir'],
    match: [/^[0-9]{2}[A-Z]{1,3}[0-9]{2,4}$/, 'Geçerli bir plaka numarası giriniz (Örn: 34ABC123)']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Araç kiralamalarını sanal olarak bağla
CarSchema.virtual('rentals', {
  ref: 'Rental',
  localField: '_id',
  foreignField: 'car',
  justOne: false
});

// Araba indeksleme
CarSchema.index({ make: 1, model: 1, year: 1 });
CarSchema.index({ location: 1 });
CarSchema.index({ available: 1 });
CarSchema.index({ price: 1 });
CarSchema.index({ 
  make: 'text', 
  model: 'text', 
  description: 'text',
  location: 'text'
});

module.exports = mongoose.model('Car', CarSchema); 