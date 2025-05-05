const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Kullanıcı kimlik doğrulama middleware
 * Token kontrolü yaparak kullanıcıyı tanımlar
 */
exports.protect = async (req, res, next) => {
  let token;

  // Token kontrolü
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Token yoksa hata döndür
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Bu işlem için yetkiniz yok. Lütfen giriş yapın.'
    });
  }

  try {
    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı bul ve isteğe ekle
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Bu token için kullanıcı bulunamadı'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Geçersiz token'
    });
  }
};

/**
 * Rol bazlı erişim kontrolü
 * @param  {...String} roles İzin verilen roller
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    next();
  };
}; 