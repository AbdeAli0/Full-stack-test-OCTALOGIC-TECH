// controllers/bookingController.js
const { Vehicle, CarType, BikeType, Booking } = require('../models');

// Sample data (replace with actual data retrieval logic from the database)

// Controller function to get all bookings
const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings from the database, excluding the VehicleId column
    const bookings = await Booking.findAll({
      attributes: { exclude: ['VehicleId'] }
    });

    // Send the bookings data as JSON response
    res.json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
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

    console.log(type);

    // Check if the specified type is either car or bike
    if (type !== 'cartype' && type !== 'biketype') {
      return res.status(400).json({ error: 'Invalid vehicle type' });
    }

    const queryOptions = {};
    if (type) queryOptions.type = type;
    if (modelName) queryOptions.typeId = typeId;

    // Check if the specified vehicle type exists
    const vehicleType = await Vehicle.findOne({
      where: queryOptions
    });    // if (type === 'cartype') {
    //   vehicleType = await CarType.findByPk(typeId);
    // } else if (type === 'biketype') {
    //   vehicleType = await BikeType.findByPk(typeId);
    // }
    console.log("vehicleType", vehicleType.availability);

    if (!vehicleType) {
      return res.status(404).json({ error: 'Vehicle type not found' });
    }


    // Check if the vehicle is availability
    if (!vehicleType.availability) {
      return res.status(409).json({ error: 'Vehicle not available for booking' });
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

    // Update the availability of the vehicle
    await vehicleType.update({ availability: false });

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
