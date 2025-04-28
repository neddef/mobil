const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('../models/Car');
const Part = require('../models/Part');
const Rental = require('../models/Rental');

// Load environment variables
dotenv.config();

// Sample data for cars
const carsData = [
  {
    brand: 'BMW',
    model: '3 Serisi',
    year: 2022,
    price: 1250000,
    km: 15000,
    fuel: 'Benzin',
    image: 'https://via.placeholder.com/300',
    location: 'İstanbul',
    isNew: false,
    description: 'Temiz kullanılmış BMW 3 Serisi',
    features: ['Otomatik Şanzıman', 'Sunroof', 'Deri Koltuk', 'LED Far'],
    color: 'Siyah',
    transmission: 'Otomatik'
  },
  {
    brand: 'Mercedes',
    model: 'C Serisi',
    year: 2021,
    price: 1380000,
    km: 25000,
    fuel: 'Dizel',
    image: 'https://via.placeholder.com/300',
    location: 'Ankara',
    isNew: false,
    description: 'Temiz kullanılmış Mercedes C Serisi',
    features: ['Otomatik Şanzıman', 'Panoramik Cam Tavan', 'Deri Koltuk', 'Isıtmalı Koltuk'],
    color: 'Beyaz',
    transmission: 'Otomatik'
  },
  {
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 1650000,
    km: 0,
    fuel: 'Benzin',
    image: 'https://via.placeholder.com/300',
    location: 'İzmir',
    isNew: true,
    description: 'Sıfır Audi A4',
    features: ['Otomatik Şanzıman', 'Sunroof', 'Deri Koltuk', 'LED Matrix Far'],
    color: 'Mavi',
    transmission: 'Otomatik'
  }
];

// Sample data for parts
const partsData = [
  {
    name: 'Bosch Akü 60AH',
    price: 2400,
    image: 'https://via.placeholder.com/100',
    discount: 15,
    category: 'Akü',
    brand: 'Bosch',
    compatibleModels: ['Tüm Modeller'],
    description: 'Uzun ömürlü Bosch akü',
    stock: 25
  },
  {
    name: 'Michelin Lastik 205/55R16',
    price: 1800,
    image: 'https://via.placeholder.com/100',
    discount: 0,
    category: 'Lastik',
    brand: 'Michelin',
    compatibleModels: ['Volkswagen Golf', 'Renault Megane', 'Ford Focus'],
    description: 'Dört mevsim Michelin lastik',
    stock: 40
  },
  {
    name: 'Mobil 1 Motor Yağı 4L',
    price: 750,
    image: 'https://via.placeholder.com/100',
    discount: 10,
    category: 'Motor Yağı',
    brand: 'Mobil 1',
    compatibleModels: ['Tüm Modeller'],
    description: 'Tam sentetik motor yağı',
    stock: 50
  }
];

// Sample data for rentals
const rentalsData = [
  {
    brand: 'Toyota',
    model: 'Corolla',
    dailyPrice: 950,
    image: 'https://via.placeholder.com/150',
    location: 'İstanbul',
    year: 2022,
    fuel: 'Benzin',
    transmission: 'Otomatik',
    description: 'Ekonomik sedan',
    features: ['Bluetooth', 'Klima', 'Yol Bilgisayarı'],
    available: true
  },
  {
    brand: 'Volkswagen',
    model: 'Passat',
    dailyPrice: 1200,
    image: 'https://via.placeholder.com/150',
    location: 'Ankara',
    year: 2021,
    fuel: 'Dizel',
    transmission: 'Otomatik',
    description: 'Konforlu sedan',
    features: ['Bluetooth', 'Klima', 'Deri Koltuk', 'Geri Görüş Kamerası'],
    available: true
  },
  {
    brand: 'Renault',
    model: 'Megane',
    dailyPrice: 850,
    image: 'https://via.placeholder.com/150',
    location: 'İzmir',
    year: 2022,
    fuel: 'Benzin',
    transmission: 'Manuel',
    description: 'Ekonomik hatchback',
    features: ['Bluetooth', 'Klima', 'Yol Bilgisayarı'],
    available: true
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/otocarDB')
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      // Clear existing data
      await Car.deleteMany({});
      await Part.deleteMany({});
      await Rental.deleteMany({});

      // Insert new data
      await Car.insertMany(carsData);
      await Part.insertMany(partsData);
      await Rental.insertMany(rentalsData);

      console.log('Database seeded successfully');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
  }); 