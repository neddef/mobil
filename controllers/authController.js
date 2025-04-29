const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * @desc    Kullanıcı kaydı
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // E-posta adresi zaten kullanılıyor mu kontrol et
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Bu e-posta adresi zaten kullanımda'
      });
    }
    
    // Yeni kullanıcı oluştur
    user = await User.create({
      name,
      email,
      password,
      phone
    });
    
    // JWT token oluştur
    const token = user.getSignedJwtToken();
    
    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kayıt sırasında bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Kullanıcı girişi
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // E-posta ve şifre kontrolü
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Lütfen e-posta ve şifre girin'
      });
    }
    
    // Şifreyi veritabanından seç
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz giriş bilgileri'
      });
    }
    
    // Şifre kontrolü
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz giriş bilgileri'
      });
    }
    
    // JWT token oluştur
    const token = user.getSignedJwtToken();
    
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Giriş sırasında bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Giriş yapmış kullanıcı bilgilerini getir
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kullanıcı bilgisi getirilirken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Şifre sıfırlama talebi
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Bu e-posta adresine sahip bir kullanıcı bulunamadı'
      });
    }
    
    // Şifre sıfırlama token'ı oluştur
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Veritabanına token ve son kullanma tarihi bilgilerini kaydet
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 saat
    
    await user.save({ validateBeforeSave: false });
    
    // Gerçek uygulamada burada e-posta gönderme işlemi yapılır
    // Şimdilik sadece token döndürüyoruz
    
    res.status(200).json({
      success: true,
      message: 'Şifre sıfırlama talebi oluşturuldu',
      resetToken
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Şifre sıfırlama talebi oluşturulurken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Şifre sıfırlama
 * @route   PUT /api/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    
    // Token'ın geçerliliğini kontrol et
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Kullanıcıyı bul
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz token veya süresi dolmuş'
      });
    }
    
    // Yeni şifreyi ayarla
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Şifreniz başarıyla sıfırlandı'
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token süresi dolmuş'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Şifre sıfırlanırken bir hata oluştu',
      error: error.message
    });
  }
}; 