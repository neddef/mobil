const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser, 
  getProfile,
  changePassword
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Otomatik oluşturulan kullanıcı ID'si
 *         name:
 *           type: string
 *           description: Kullanıcının tam adı
 *         email:
 *           type: string
 *           format: email
 *           description: Kullanıcının e-posta adresi
 *         phone:
 *           type: string
 *           description: Kullanıcının telefon numarası
 *         address:
 *           type: string
 *           description: Kullanıcının adresi
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Kullanıcı rolü
 *         avatar:
 *           type: string
 *           description: Profil resmi URL'si
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Kullanıcı oluşturulma tarihi
 */

// Tüm kullanıcılar (yalnızca admin)
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Tüm kullanıcıları getir
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcılar başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       500:
 *         description: Sunucu hatası
 */
router.get('/', protect, authorize('admin'), getUsers);

// Kullanıcı profili
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Kullanıcı profil bilgilerini getir
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil bilgileri başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Kimlik doğrulama başarısız
 *       500:
 *         description: Sunucu hatası
 */
router.get('/profile', protect, getProfile);

// Şifre değiştirme
/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Kullanıcı şifresini değiştir
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 description: Mevcut şifre
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: Yeni şifre (minimum 6 karakter)
 *     responses:
 *       200:
 *         description: Şifre başarıyla değiştirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *       400:
 *         description: Geçersiz bilgiler
 *       401:
 *         description: Mevcut şifre yanlış
 *       500:
 *         description: Sunucu hatası
 */
router.put('/change-password', protect, changePassword);

// Belirli bir kullanıcı
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Kullanıcı detaylarını getir
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcı ID'si
 *     responses:
 *       200:
 *         description: Kullanıcı bilgileri başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get('/:id', protect, authorize('admin'), getUser);

// Kullanıcı oluşturma (yalnızca admin)
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Yeni kullanıcı oluştur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       400:
 *         description: E-posta adresi zaten kullanımda veya geçersiz bilgiler
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       500:
 *         description: Sunucu hatası
 */
router.post('/', protect, authorize('admin'), createUser);

// Kullanıcı güncelleme (kendisi veya admin)
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Kullanıcı bilgilerini güncelle
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcı ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: Kullanıcı bilgileri başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put('/:id', protect, updateUser);

// Kullanıcı silme (yalnızca admin)
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Kullanıcı sil
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcı ID'si
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Kullanıcı kendisini silemez
 *       401:
 *         description: Yetkisiz erişim
 *       403:
 *         description: Bu işlem için yetkiniz yok
 *       404:
 *         description: Kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router; 