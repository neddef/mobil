const Rental = require('../models/Rental');

// Get all rentals
exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single rental
exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new rental
exports.createRental = async (req, res) => {
  try {
    const newRental = new Rental(req.body);
    await newRental.save();
    res.status(201).json(newRental);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a rental
exports.updateRental = async (req, res) => {
  try {
    const updatedRental = await Rental.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedRental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    
    res.status(200).json(updatedRental);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a rental
exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    
    res.status(200).json({ message: 'Rental deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book a rental
exports.bookRental = async (req, res) => {
  try {
    const { startDate, endDate, rentedBy } = req.body;
    const rental = await Rental.findById(req.params.id);
    
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    
    if (!rental.available) {
      return res.status(400).json({ message: 'This vehicle is not available for rental' });
    }
    
    // Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * rental.dailyPrice;
    
    // Add rental booking
    rental.rentals.push({
      startDate,
      endDate,
      rentedBy,
      totalPrice
    });
    
    // Check if we should set available to false
    const currentDate = new Date();
    const hasActiveRental = rental.rentals.some(r => {
      const rentalEnd = new Date(r.endDate);
      return rentalEnd >= currentDate;
    });
    
    if (hasActiveRental) {
      rental.available = false;
    }
    
    await rental.save();
    res.status(200).json(rental);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search rentals by filter criteria
exports.searchRentals = async (req, res) => {
  try {
    const { brand, model, location, maxDailyPrice, available } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (model) filter.model = { $regex: model, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (maxDailyPrice) filter.dailyPrice = { $lte: Number(maxDailyPrice) };
    if (available === 'true') filter.available = true;
    
    const rentals = await Rental.find(filter);
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 