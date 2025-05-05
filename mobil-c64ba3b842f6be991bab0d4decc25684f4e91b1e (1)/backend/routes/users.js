const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', userController.register);

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', userController.login);

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, userController.getCurrentUser);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, userController.updateProfile);

// @route   POST /api/users/favorites
// @desc    Add item to favorites
// @access  Private
router.post('/favorites', auth, userController.addToFavorites);

// @route   DELETE /api/users/favorites
// @desc    Remove item from favorites
// @access  Private
router.delete('/favorites', auth, userController.removeFromFavorites);

module.exports = router; 