const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       required:
 *         - customer
 *         - car
 *         - pickupDate
 *         - returnDate
 *         - pickupLocation
 *         - returnLocation
 *       properties:
 *         _id:
 *           type: string
 *           description: Otomatik oluşturulan ID
 *         customer:
 *           type: string
 *           description: Müşteri ID'si
 *         car:
 *           type: string
 *           description: Araba ID'si
 *         pickupDate:
 *           type: string
 *           format: date
 *           description: Alış tarihi
 *         returnDate:
 *           type: string
 *           format: date
 *           description: İade tarihi
 *         pickupLocation:
 *           type: string
 *           description: Alış konumu
 *         returnLocation:
 *           type: string
 *           description: İade konumu
 *         status:
 *           type: string
 *           enum: [Onay Bekliyor, Onaylandı, İptal Edildi, Tamamlandı]
 *           description: Kiralama durumu
 *         totalAmount:
 *           type: number
 *           description: Toplam tutar
 *         paymentStatus:
 *           type: string
 *           enum: [Ödenmedi, Kısmi Ödeme, Ödendi]
 *           description: Ödeme durumu
 *         paymentMethod:
 *           type: string
 *           enum: [Kredi Kartı, Nakit, Havale/EFT, Diğer]
 *           description: Ödeme yöntemi
 */

// Geçici route handler'ları - daha sonra controller dosyasına taşınacak
const tempController = {
  getRentals: (req, res) => {
    res.json({ message: 'Tüm kiralamalar listelendi', data: [] });
  },
  getRentalById: (req, res) => {
    res.json({ message: `${req.params.id} ID'li kiralama getirildi`, data: {} });
  },
  createRental: (req, res) => {
    res.status(201).json({ message: 'Kiralama oluşturuldu', data: req.body });
  },
  updateRental: (req, res) => {
    res.json({ message: `${req.params.id} ID'li kiralama güncellendi`, data: req.body });
  },
  deleteRental: (req, res) => {
    res.json({ message: `${req.params.id} ID'li kiralama silindi` });
  },
  getUserRentals: (req, res) => {
    res.json({ message: 'Kullanıcının kiralamaları listelendi', user: req.user.id, data: [] });
  },
  updateRentalStatus: (req, res) => {
    res.json({ 
      message: `${req.params.id} ID'li kiralamanın durumu ${req.body.status} olarak güncellendi`, 
      id: req.params.id,
      status: req.body.status || 'Belirsiz'
    });
  }
};

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Tüm kiralamaları getir
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
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
 *                     $ref: '#/components/schemas/Rental'
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.get('/', protect, tempController.getRentals);

/**
 * @swagger
 * /api/rentals/me:
 *   get:
 *     summary: Kullanıcının kendi kiralamalarını getir
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
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
 *                 user:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rental'
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.get('/me', protect, tempController.getUserRentals);

/**
 * @swagger
 * /api/rentals/{id}:
 *   get:
 *     summary: ID'ye göre kiralama getir
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kiralama ID'si
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
 *                   $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Kiralama bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.get('/:id', protect, tempController.getRentalById);

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: Yeni kiralama oluştur
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - car
 *               - pickupDate
 *               - returnDate
 *               - pickupLocation
 *               - returnLocation
 *             properties:
 *               car:
 *                 type: string
 *                 description: Araba ID'si
 *               pickupDate:
 *                 type: string
 *                 format: date
 *                 description: Alış tarihi
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: İade tarihi
 *               pickupLocation:
 *                 type: string
 *                 description: Alış konumu
 *               returnLocation:
 *                 type: string
 *                 description: İade konumu
 *               additionalServices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kiralama oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Rental'
 *       400:
 *         description: Geçersiz veri
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.post('/', protect, tempController.createRental);

/**
 * @swagger
 * /api/rentals/{id}/status:
 *   patch:
 *     summary: Kiralama durumunu güncelle
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kiralama ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Onay Bekliyor, Onaylandı, İptal Edildi, Tamamlandı]
 *                 description: Yeni durum
 *               cancellationReason:
 *                 type: string
 *                 description: İptal nedeni (İptal Edildi durumu için)
 *     responses:
 *       200:
 *         description: Durum güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Kiralama bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.patch('/:id/status', protect, tempController.updateRentalStatus);

/**
 * @swagger
 * /api/rentals/{id}:
 *   put:
 *     summary: Kiralama güncelle
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kiralama ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       200:
 *         description: Kiralama güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Kiralama bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.put('/:id', protect, tempController.updateRental);

/**
 * @swagger
 * /api/rentals/{id}:
 *   delete:
 *     summary: Kiralama sil
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kiralama ID'si
 *     responses:
 *       200:
 *         description: Kiralama silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Kiralama bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.delete('/:id', protect, authorize('admin'), tempController.deleteRental);

module.exports = router; 