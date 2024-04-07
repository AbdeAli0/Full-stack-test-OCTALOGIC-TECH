// controllers/bookingController.js
const { Vehicle, CarType, BikeType, Booking } = require('../models');

// Sample data (replace with actual data retrieval logic from the database)
const bookings = [
  { id: 1, name: 'Booking 1' },
  { id: 2, name: 'Booking 2' }
];

// Controller function to get all bookings
const getAllBookings = (req, res) => {
  // Logic to fetch bookings from the database
  res.json(bookings);
};

// Controller function to create a booking
const createBooking = async (req, res) => {
  const { firstName, lastName, type, typeId, modelName, bookingStart, bookingEnd } = req.body;

  try {
    // Check if all required fields are provided
    if (!firstName || !lastName || !type || !typeId || !modelName || !bookingStart || !bookingEnd) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate booking start and end dates
    const start = new Date(bookingStart);
    const end = new Date(bookingEnd);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return res.status(400).json({ error: 'Invalid booking dates' });
    }

    // Check if the specified car type exists
    const carType = await CarType.findByPk(typeId);
    if (!carType) {
      return res.status(404).json({ error: 'Car type not found' });
    }

    // Create a new booking record
    const newBooking = await Booking.create({
      firstName,
      lastName,
      type,
      typeId,
      modelName,
      bookingStart: start.toString(),
      bookingEnd: end.toString()
    });

    // Return the newly created booking
    return res.json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error adding booking:', error);
    return res.status(500).json({ error: 'An error occurred while adding booking' });
  }
};

module.exports = {
  getAllBookings,
  createBooking
};
