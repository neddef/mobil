const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });
    
    await newUser.save();
    
    // Generate token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const user = newUser.toObject();
    delete user.password;
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const userObj = user.toObject();
    delete userObj.password;
    
    res.status(200).json({ user: userObj, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password');
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address, avatar } = req.body;
    
    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (avatar) updateData.avatar = avatar;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add car to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { itemId, itemType } = req.body;
    
    if (!['cars', 'parts', 'rentals'].includes(itemType)) {
      return res.status(400).json({ message: 'Invalid item type' });
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if item is already in favorites
    const itemExists = user.favorites[itemType].some(id => id.toString() === itemId);
    if (itemExists) {
      return res.status(400).json({ message: `Item already in ${itemType} favorites` });
    }
    
    // Add to favorites
    user.favorites[itemType].push(itemId);
    await user.save();
    
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { itemId, itemType } = req.body;
    
    if (!['cars', 'parts', 'rentals'].includes(itemType)) {
      return res.status(400).json({ message: 'Invalid item type' });
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Filter out the item
    user.favorites[itemType] = user.favorites[itemType].filter(
      id => id.toString() !== itemId
    );
    
    await user.save();
    
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 