const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - year
 *         - color
 *         - price
 *         - dailyRentalRate
 *         - licensePlate
 *       properties:
 *         _id:
 *           type: string
 *           description: Otomatik oluşturulan ID
 *         make:
 *           type: string
 *           description: Arabanın markası
 *         model:
 *           type: string
 *           description: Arabanın modeli
 *         year:
 *           type: number
 *           description: Üretim yılı
 *         color:
 *           type: string
 *           description: Arabanın rengi
 *         price:
 *           type: number
 *           description: Satış fiyatı
 *         dailyRentalRate:
 *           type: number
 *           description: Günlük kiralama ücreti
 *         transmission:
 *           type: string
 *           enum: [Manuel, Otomatik, Yarı Otomatik]
 *           description: Vites tipi
 *         fuelType:
 *           type: string
 *           enum: [Benzin, Dizel, LPG, Elektrik, Hibrit]
 *           description: Yakıt tipi
 *         mileage:
 *           type: number
 *           description: Kilometre
 *         available:
 *           type: boolean
 *           description: Kiralanabilir durumda mı
 *         licensePlate:
 *           type: string
 *           description: Plaka numarası
 */

// Geçici route handler'ları - daha sonra controller dosyasına taşınacak
const tempController = {
  getCars: (req, res) => {
    res.json({ message: 'Tüm arabalar listelendi', data: [] });
  },
  getCarById: (req, res) => {
    res.json({ message: `${req.params.id} ID'li araba getirildi`, data: {} });
  },
  createCar: (req, res) => {
    res.status(201).json({ message: 'Araba oluşturuldu', data: req.body });
  },
  updateCar: (req, res) => {
    res.json({ message: `${req.params.id} ID'li araba güncellendi`, data: req.body });
  },
  deleteCar: (req, res) => {
    res.json({ message: `${req.params.id} ID'li araba silindi` });
  },
  searchCars: (req, res) => {
    res.json({ message: 'Araba araması yapıldı', query: req.query, data: [] });
  }
};

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Tüm arabaları getir
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 */
router.get('/', tempController.getCars);

/**
 * @swagger
 * /api/cars/search:
 *   get:
 *     summary: Arabaları filtrele
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *         description: Marka
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Model
 *       - in: query
 *         name: minYear
 *         schema:
 *           type: number
 *         description: Minimum yıl
 *       - in: query
 *         name: maxYear
 *         schema:
 *           type: number
 *         description: Maksimum yıl
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Sadece uygun olanlar
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 query:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 */
router.get('/search', tempController.searchCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: ID'ye göre araba getir
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Araba ID'si
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       404:
 *         description: Araba bulunamadı
 */
router.get('/:id', tempController.getCarById);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Yeni araba oluştur
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Araba oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       400:
 *         description: Geçersiz veri
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.post('/', protect, tempController.createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Araba güncelle
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Araba ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Araba güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       404:
 *         description: Araba bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.put('/:id', protect, tempController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Araba sil
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Araba ID'si
 *     responses:
 *       200:
 *         description: Araba silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Araba bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.delete('/:id', protect, tempController.deleteCar);

module.exports = router; 