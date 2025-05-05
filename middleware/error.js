/**
 * Hata işleme middleware
 * Farklı türdeki hataları uygun şekilde işler ve cevap döndürür
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Konsola hatayı yazdır
  console.error(err);

  // Mongoose ID hatası
  if (err.name === 'CastError') {
    const message = 'Kaynak bulunamadı';
    error = { message, status: 404 };
  }

  // Mongoose validation hatası
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, status: 400 };
  }

  // Mongoose duplicate key hatası
  if (err.code === 11000) {
    let field = Object.keys(err.keyValue)[0];
    let value = err.keyValue[field];
    const message = `${field} alanı için '${value}' değeri zaten kullanımda`;
    error = { message, status: 400 };
  }

  // JWT hatası
  if (err.name === 'JsonWebTokenError') {
    const message = 'Geçersiz token, lütfen tekrar giriş yapın';
    error = { message, status: 401 };
  }

  // JWT zamanaşımı hatası
  if (err.name === 'TokenExpiredError') {
    const message = 'Token süresi doldu, lütfen tekrar giriş yapın';
    error = { message, status: 401 };
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Sunucu hatası',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;