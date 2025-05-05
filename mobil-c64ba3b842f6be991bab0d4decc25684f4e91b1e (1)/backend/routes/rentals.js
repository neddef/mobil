const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const auth = require('../middleware/auth');

// @route   GET /api/rentals
// @desc    Get all rentals
// @access  Public
router.get('/', rentalController.getRentals);

// @route   GET /api/rentals/search
// @desc    Search rentals by filter criteria
// @access  Public
router.get('/search', rentalController.searchRentals);

// @route   GET /api/rentals/:id
// @desc    Get a single rental
// @access  Public
router.get('/:id', rentalController.getRentalById);

// @route   POST /api/rentals
// @desc    Create a new rental
// @access  Private
router.post('/', auth, rentalController.createRental);

// @route   PUT /api/rentals/:id
// @desc    Update a rental
// @access  Private
router.put('/:id', auth, rentalController.updateRental);

// @route   DELETE /api/rentals/:id
// @desc    Delete a rental
// @access  Private
router.delete('/:id', auth, rentalController.deleteRental);

// @route   POST /api/rentals/:id/book
// @desc    Book a rental
// @access  Private
router.post('/:id/book', auth, rentalController.bookRental);

module.exports = router; 