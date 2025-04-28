const Part = require('../models/Part');

// Get all parts
exports.getParts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single part
exports.getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new part
exports.createPart = async (req, res) => {
  try {
    const newPart = new Part(req.body);
    await newPart.save();
    res.status(201).json(newPart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a part
exports.updatePart = async (req, res) => {
  try {
    const updatedPart = await Part.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPart) {
      return res.status(404).json({ message: 'Part not found' });
    }
    
    res.status(200).json(updatedPart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a part
exports.deletePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndDelete(req.params.id);
    
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }
    
    res.status(200).json({ message: 'Part deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search parts by filter criteria
exports.searchParts = async (req, res) => {
  try {
    const { name, category, brand, minPrice, maxPrice, discount } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (discount) filter.discount = { $gte: Number(discount) };
    
    const parts = await Part.find(filter);
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 