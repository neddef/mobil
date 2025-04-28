const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

// Swagger yapılandırması
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OtoCars API',
      version: '1.0.0',
      description: 'OtoCars Uygulaması API Dokümantasyonu',
    },
    servers: [
      {
        url: 'http://localhost:5000',
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Rota dosyalarını tarar
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Import routes
const carsRoutes = require('./routes/cars');
const partsRoutes = require('./routes/parts');
const rentalRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/otocarDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/cars', carsRoutes);
app.use('/api/parts', partsRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', usersRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to OtoCars API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
})
.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying with port ${PORT + 1}`);
    app.listen(PORT + 1, () => {
      console.log(`Server is running on port ${PORT + 1}`);
      console.log(`Swagger UI: http://localhost:${PORT + 1}/api-docs`);
    });
  } else {
    console.error(e);
  }
});

module.exports = app;