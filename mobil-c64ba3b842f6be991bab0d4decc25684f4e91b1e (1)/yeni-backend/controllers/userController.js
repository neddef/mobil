const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * @desc    Tüm kullanıcıları getir
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kullanıcılar getirilirken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Kullanıcı detaylarını getir
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kullanıcı getirilirken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Kullanıcı oluştur
 * @route   POST /api/users
 * @access  Private/Admin
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Kullanıcı zaten var mı kontrol et
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Bu e-posta adresi zaten kullanımda'
      });
    }
    
    // Kullanıcıyı oluştur
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });
    
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kullanıcı oluşturulurken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Kullanıcı güncelle
 * @route   PUT /api/users/:id
 * @access  Private/Admin or User (self)
 */
exports.updateUser = async (req, res) => {
  try {
    // Şifreyi güncelleme işlemi için ayrı bir endpoint kullanılmalı
    if (req.body.password) {
      delete req.body.password;
    }
    
    // Normal kullanıcı sadece kendi bilgilerini güncelleyebilir
    if (req.user.role !== 'admin' && req.params.id !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Başka bir kullanıcının bilgilerini güncelleme yetkiniz yok'
      });
    }
    
    // Admin olmayan kullanıcılar rol değiştiremez
    if (req.user.role !== 'admin' && req.body.role) {
      delete req.body.role;
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kullanıcı güncellenirken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Kullanıcı sil
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }
    
    // Kendini silmeye çalışıyor mu kontrol et
    if (req.params.id === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Kendinizi silemezsiniz'
      });
    }
    
    await user.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kullanıcı silinirken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Profil bilgisini getir
 * @route   GET /api/users/profile
 * @access  Private
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Profil bilgisi getirilirken bir hata oluştu',
      error: error.message
    });
  }
};

/**
 * @desc    Şifre güncelle
 * @route   PUT /api/users/change-password
 * @access  Private
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mevcut şifre ve yeni şifre gereklidir'
      });
    }
    
    // Şifreyle birlikte kullanıcıyı getir
    const user = await User.findById(req.user.id).select('+password');
    
    // Mevcut şifreyi kontrol et
    const isMatch = await user.matchPassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mevcut şifre yanlış'
      });
    }
    
    // Yeni şifreyi ayarla ve kaydet
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Şifre başarıyla güncellendi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Şifre güncellenirken bir hata oluştu',
      error: error.message
    });
  }
}; 