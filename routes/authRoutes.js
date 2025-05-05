const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags: [Auth]
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
 *                 description: Kullanıcının tam adı
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Kullanıcının e-posta adresi
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Kullanıcının şifresi (minimum 6 karakter)
 *               phone:
 *                 type: string
 *                 description: Kullanıcının telefon numarası
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu ve giriş yapıldı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: E-posta adresi zaten kullanımda veya geçersiz bilgiler
 *       500:
 *         description: Sunucu hatası
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Kullanıcının e-posta adresi
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Kullanıcının şifresi
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Geçersiz giriş bilgileri
 *       500:
 *         description: Sunucu hatası
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Giriş yapmış kullanıcı bilgilerini getir
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Kimlik doğrulama başarısız
 *       500:
 *         description: Sunucu hatası
 */
router.get('/me', protect, getMe);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Şifre sıfırlama talebi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Kullanıcının e-posta adresi
 *     responses:
 *       200:
 *         description: Şifre sıfırlama talebi oluşturuldu
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
 *                 resetToken:
 *                   type: string
 *                   description: Şifre sıfırlama token'ı
 *       404:
 *         description: Bu e-posta adresine sahip kullanıcı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   put:
 *     summary: Şifre sıfırlama
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Şifre sıfırlama token'ı
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Yeni şifre
 *     responses:
 *       200:
 *         description: Şifre başarıyla sıfırlandı
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
 *         description: Geçersiz token veya süresi dolmuş
 *       401:
 *         description: Geçersiz token
 *       500:
 *         description: Sunucu hatası
 */
router.put('/reset-password/:token', resetPassword);

module.exports = router; 