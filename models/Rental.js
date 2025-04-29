const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Müşteri bilgisi gereklidir']
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Araç bilgisi gereklidir']
  },
  pickupDate: {
    type: Date,
    required: [true, 'Alış tarihi gereklidir'],
    min: [Date.now, 'Alış tarihi geçmiş bir tarih olamaz']
  },
  returnDate: {
    type: Date,
    required: [true, 'İade tarihi gereklidir'],
    validate: {
      validator: function(value) {
        return value > this.pickupDate;
      },
      message: 'İade tarihi, alış tarihinden sonra olmalıdır'
    }
  },
  pickupLocation: {
    type: String,
    required: [true, 'Alış konumu gereklidir'],
    trim: true
  },
  returnLocation: {
    type: String,
    required: [true, 'İade konumu gereklidir'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Onay Bekliyor', 'Onaylandı', 'İptal Edildi', 'Tamamlandı'],
    default: 'Onay Bekliyor'
  },
  totalAmount: {
    type: Number,
    min: [0, 'Toplam tutar negatif olamaz']
  },
  paymentStatus: {
    type: String,
    enum: ['Ödenmedi', 'Kısmi Ödeme', 'Ödendi'],
    default: 'Ödenmedi'
  },
  paymentMethod: {
    type: String,
    enum: ['Kredi Kartı', 'Nakit', 'Havale/EFT', 'Diğer'],
    default: 'Kredi Kartı'
  },
  additionalServices: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Hizmet fiyatı negatif olamaz']
    }
  }],
  driverInfo: {
    name: String,
    licenseNumber: String,
    licenseExpiry: Date
  },
  notes: {
    type: String,
    maxlength: [500, 'Notlar 500 karakterden fazla olamaz']
  },
  cancellationReason: {
    type: String,
    maxlength: [500, 'İptal nedeni 500 karakterden fazla olamaz']
  },
  insuranceInfo: {
    type: String,
    default: 'Tam Sigorta'
  },
  adminNotes: {
    type: String,
    maxlength: [500, 'Yönetici notları 500 karakterden fazla olamaz']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Kiralama süresi (gün) - sanal alan
RentalSchema.virtual('rentalDays').get(function() {
  return Math.ceil((this.returnDate - this.pickupDate) / (1000 * 60 * 60 * 24));
});

// Kiralama kaydı oluşturulmadan önce toplam tutarı hesapla
RentalSchema.pre('save', async function(next) {
  if (!this.isModified('pickupDate') && !this.isModified('returnDate') && this.totalAmount) {
    return next();
  }

  try {
    // Aracı getir
    const Car = mongoose.model('Car');
    const car = await Car.findById(this.car);
    
    if (!car) {
      throw new Error('Araç bulunamadı');
    }
    
    // Kiralama günü sayısını hesapla
    const days = Math.ceil((this.returnDate - this.pickupDate) / (1000 * 60 * 60 * 24));
    
    // Temel kiralama ücreti
    let total = days * car.dailyRentalRate;
    
    // Ek hizmet ücretlerini ekle
    if (this.additionalServices && this.additionalServices.length > 0) {
      this.additionalServices.forEach(service => {
        total += service.price;
      });
    }
    
    this.totalAmount = total;
    next();
  } catch (error) {
    next(error);
  }
});

// Kiralama kaydı oluşturulduğunda aracın durumunu güncelle
RentalSchema.post('save', async function() {
  if (this.status === 'Onaylandı') {
    try {
      const Car = mongoose.model('Car');
      await Car.findByIdAndUpdate(this.car, { available: false });
    } catch (error) {
      console.error('Araç durumu güncellenirken hata:', error);
    }
  }
});

module.exports = mongoose.model('Rental', RentalSchema); 