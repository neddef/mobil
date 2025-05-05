const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Parça adı gereklidir'],
    trim: true,
    maxlength: [100, 'Parça adı 100 karakterden fazla olamaz']
  },
  category: {
    type: String,
    required: [true, 'Kategori gereklidir'],
    enum: [
      'Motor Parçaları',
      'Fren Sistemi',
      'Süspansiyon',
      'Elektrik',
      'Şanzıman',
      'Diferansiyel',
      'İç Donanım',
      'Dış Donanım',
      'Lastik ve Jant',
      'Yağ ve Sıvılar',
      'Aydınlatma',
      'Diğer'
    ]
  },
  description: {
    type: String,
    required: [true, 'Açıklama gereklidir'],
    trim: true,
    maxlength: [1000, 'Açıklama 1000 karakterden fazla olamaz']
  },
  price: {
    type: Number,
    required: [true, 'Fiyat gereklidir'],
    min: [0, 'Fiyat negatif olamaz']
  },
  stock: {
    type: Number,
    required: [true, 'Stok bilgisi gereklidir'],
    min: [0, 'Stok negatif olamaz']
  },
  images: {
    type: [String],
    default: ['default-part.jpg']
  },
  brand: {
    type: String,
    required: [true, 'Marka gereklidir'],
    trim: true
  },
  partNumber: {
    type: String,
    required: [true, 'Parça numarası gereklidir'],
    unique: true,
    trim: true
  },
  compatibleCars: [{
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    yearStart: {
      type: Number,
      required: true
    },
    yearEnd: {
      type: Number,
      required: true
    }
  }],
  warranty: {
    type: Number, // Ay cinsinden
    default: 12
  },
  condition: {
    type: String,
    enum: ['Yeni', 'Kullanılmış', 'Yenilenmiş'],
    default: 'Yeni'
  },
  featured: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    min: [0, 'İndirim oranı negatif olamaz'],
    max: [100, 'İndirim oranı %100\'den fazla olamaz'],
    default: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// İndeksler
PartSchema.index({ name: 1, brand: 1 });
PartSchema.index({ category: 1 });
PartSchema.index({ price: 1 });
PartSchema.index({ 
  name: 'text', 
  description: 'text', 
  brand: 'text',
  partNumber: 'text'
});

// Sanal alan - indirimli fiyat
PartSchema.virtual('discountedPrice').get(function() {
  return this.price - (this.price * (this.discount / 100));
});

module.exports = mongoose.model('Part', PartSchema); 