const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Geçici route handler'ları - daha sonra controller dosyasına taşınacak
const tempController = {
  uploadFile: (req, res) => {
    res.status(201).json({ 
      message: 'Dosya yüklendi', 
      file: {
        filename: 'dosya.jpg',
        path: '/uploads/dosya.jpg',
        size: '1024 bytes',
        mimetype: 'image/jpeg'
      }
    });
  },
  uploadMultipleFiles: (req, res) => {
    res.status(201).json({ 
      message: 'Dosyalar yüklendi', 
      files: [
        {
          filename: 'dosya1.jpg',
          path: '/uploads/dosya1.jpg',
          size: '1024 bytes',
          mimetype: 'image/jpeg'
        },
        {
          filename: 'dosya2.jpg',
          path: '/uploads/dosya2.jpg',
          size: '2048 bytes',
          mimetype: 'image/jpeg'
        }
      ]
    });
  }
};

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Dosya yükle
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Yüklenecek dosya
 *     responses:
 *       201:
 *         description: Dosya yüklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 file:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     path:
 *                       type: string
 *                     size:
 *                       type: string
 *                     mimetype:
 *                       type: string
 *       400:
 *         description: Geçersiz dosya
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.post('/', protect, tempController.uploadFile);

/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary: Birden fazla dosya yükle
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Yüklenecek dosyalar
 *     responses:
 *       201:
 *         description: Dosyalar yüklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       filename:
 *                         type: string
 *                       path:
 *                         type: string
 *                       size:
 *                         type: string
 *                       mimetype:
 *                         type: string
 *       400:
 *         description: Geçersiz dosya(lar)
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.post('/multiple', protect, tempController.uploadMultipleFiles);

module.exports = router; 