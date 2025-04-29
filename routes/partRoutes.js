const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Part:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *         - brand
 *         - partNumber
 *         - seller
 *       properties:
 *         _id:
 *           type: string
 *           description: Otomatik oluşturulan ID
 *         name:
 *           type: string
 *           description: Parça adı
 *         category:
 *           type: string
 *           enum: [Motor Parçaları, Fren Sistemi, Süspansiyon, Elektrik, Şanzıman, Diferansiyel, İç Donanım, Dış Donanım, Lastik ve Jant, Yağ ve Sıvılar, Aydınlatma, Diğer]
 *           description: Parça kategorisi
 *         description:
 *           type: string
 *           description: Parça açıklaması
 *         price:
 *           type: number
 *           description: Parça fiyatı
 *         stock:
 *           type: number
 *           description: Stok miktarı
 *         brand:
 *           type: string
 *           description: Parça markası
 *         partNumber:
 *           type: string
 *           description: Parça numarası
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Parça görsel URL'leri
 *         discount:
 *           type: number
 *           description: İndirim yüzdesi
 *         condition:
 *           type: string
 *           enum: [Yeni, Kullanılmış, Yenilenmiş]
 *           description: Parça durumu
 *         seller:
 *           type: string
 *           description: Satıcı ID'si
 */

// Geçici route handler'ları - daha sonra controller dosyasına taşınacak
const tempController = {
  getParts: (req, res) => {
    res.json({ message: 'Tüm parçalar listelendi', data: [] });
  },
  getPartById: (req, res) => {
    res.json({ message: `${req.params.id} ID'li parça getirildi`, data: {} });
  },
  createPart: (req, res) => {
    res.status(201).json({ message: 'Parça oluşturuldu', data: req.body });
  },
  updatePart: (req, res) => {
    res.json({ message: `${req.params.id} ID'li parça güncellendi`, data: req.body });
  },
  deletePart: (req, res) => {
    res.json({ message: `${req.params.id} ID'li parça silindi` });
  },
  searchParts: (req, res) => {
    res.json({ message: 'Parça araması yapıldı', query: req.query, data: [] });
  },
  getByCategory: (req, res) => {
    res.json({ 
      message: `${req.params.category} kategorisindeki parçalar listelendi`, 
      category: req.params.category,
      data: [] 
    });
  }
};

/**
 * @swagger
 * /api/parts:
 *   get:
 *     summary: Tüm parçaları getir
 *     tags: [Parts]
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
 *                     $ref: '#/components/schemas/Part'
 */
router.get('/', tempController.getParts);

/**
 * @swagger
 * /api/parts/search:
 *   get:
 *     summary: Parçaları filtrele
 *     tags: [Parts]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Parça adı
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Kategori
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Marka
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum fiyat
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maksimum fiyat
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
 *                     $ref: '#/components/schemas/Part'
 */
router.get('/search', tempController.searchParts);

/**
 * @swagger
 * /api/parts/category/{category}:
 *   get:
 *     summary: Kategoriye göre parçaları getir
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Parça kategorisi
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
 *                 category:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Part'
 */
router.get('/category/:category', tempController.getByCategory);

/**
 * @swagger
 * /api/parts/{id}:
 *   get:
 *     summary: ID'ye göre parça getir
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Parça ID'si
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
 *                   $ref: '#/components/schemas/Part'
 *       404:
 *         description: Parça bulunamadı
 */
router.get('/:id', tempController.getPartById);

/**
 * @swagger
 * /api/parts:
 *   post:
 *     summary: Yeni parça oluştur
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       201:
 *         description: Parça oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Part'
 *       400:
 *         description: Geçersiz veri
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.post('/', protect, tempController.createPart);

/**
 * @swagger
 * /api/parts/{id}:
 *   put:
 *     summary: Parça güncelle
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Parça ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: Parça güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Part'
 *       404:
 *         description: Parça bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.put('/:id', protect, tempController.updatePart);

/**
 * @swagger
 * /api/parts/{id}:
 *   delete:
 *     summary: Parça sil
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Parça ID'si
 *     responses:
 *       200:
 *         description: Parça silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Parça bulunamadı
 *       401:
 *         description: Yetkilendirme gerekli
 */
router.delete('/:id', protect, tempController.deletePart);

module.exports = router; 