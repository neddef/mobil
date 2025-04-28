const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const partRoutes = require('./routes/partRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Swagger ayarları
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OtoCar API',
      version: '1.0.0',
      description: 'OtoCar Uygulaması için API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Geliştirme Sunucusu',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Express uygulaması oluştur
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar için klasör
const uploadPath = process.env.UPLOAD_PATH || './uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadPath)));

// Swagger dokümantasyonu
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/otocarDB')
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// API rotaları
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/upload', uploadRoutes);

// Ana sayfa
app.get('/', (req, res) => {
  res.json({
    message: 'OtoCar API çalışıyor',
    documentation: `${req.protocol}://${req.get('host')}/api-docs`
  });
});

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Beklenmeyen bir hata oluştu'
  });
});

// Server başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} üzerinde çalışıyor`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} kullanımda, port ${PORT + 1} deneniyor`);
    app.listen(PORT + 1, () => {
      console.log(`Server port ${PORT + 1} üzerinde çalışıyor`);
      console.log(`Swagger: http://localhost:${PORT + 1}/api-docs`);
    });
  } else {
    console.error('Server başlatma hatası:', e);
  }
});

module.exports = app; 