const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');
const auth = require('../middleware/auth');

// @route   GET /api/parts
// @desc    Get all parts
// @access  Public
router.get('/', partController.getParts);

// @route   GET /api/parts/search
// @desc    Search parts by filter criteria
// @access  Public
router.get('/search', partController.searchParts);

// @route   GET /api/parts/:id
// @desc    Get a single part
// @access  Public
router.get('/:id', partController.getPartById);

// @route   POST /api/parts
// @desc    Create a new part
// @access  Private
router.post('/', auth, partController.createPart);

// @route   PUT /api/parts/:id
// @desc    Update a part
// @access  Private
router.put('/:id', auth, partController.updatePart);

// @route   DELETE /api/parts/:id
// @desc    Delete a part
// @access  Private
router.delete('/:id', auth, partController.deletePart);

module.exports = router; 