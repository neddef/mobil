const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const auth = require('../middleware/auth');

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
 *         - price
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
 *           description: Arabanın üretim yılı
 *         price:
 *           type: number
 *           description: Arabanın fiyatı
 *         description:
 *           type: string
 *           description: Araba hakkında detaylı bilgi
 *         imageUrl:
 *           type: string
 *           description: Arabanın resmi
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Tüm arabaları getir
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Tüm arabaların listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/', carController.getCars);

/**
 * @swagger
 * /api/cars/search:
 *   get:
 *     summary: Filtreleme kriterlerine göre arabaları ara
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *         description: Arabanın markası
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Arabanın modeli
 *       - in: query
 *         name: minYear
 *         schema:
 *           type: integer
 *         description: Minimum üretim yılı
 *       - in: query
 *         name: maxYear
 *         schema:
 *           type: integer
 *         description: Maksimum üretim yılı
 *     responses:
 *       200:
 *         description: Filtrelenmiş arabaların listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/search', carController.searchCars);

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
 *         description: Arabanın ID'si
 *     responses:
 *       200:
 *         description: Araba bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Araba bulunamadı
 */
router.get('/:id', carController.getCarById);

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
 *         description: Araba başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       401:
 *         description: Yetkisiz erişim
 */
router.post('/', auth, carController.createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Araba bilgilerini güncelle
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Arabanın ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Araba başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Araba bulunamadı
 */
router.put('/:id', auth, carController.updateCar);

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
 *         description: Arabanın ID'si
 *     responses:
 *       200:
 *         description: Araba başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Araba bulunamadı
 */
router.delete('/:id', auth, carController.deleteCar);

module.exports = router; 