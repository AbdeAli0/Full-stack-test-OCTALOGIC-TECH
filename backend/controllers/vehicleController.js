// controllers/vehiclesController.js
const { Vehicle, CarType, BikeType } = require('../models');

const getAllVehicleTypes = async (req, res) => {
  const { type } = req.body;

  try {
    if (type === 'cartype') {
      // If request type is cartype, return all car types
      const carTypes = await CarType.findAll();
      res.json(carTypes);
    } else if (type === 'biketype') {
      // If request type is biketype, return all bike types
      const bikeTypes = await BikeType.findAll();
      res.json(bikeTypes);
    } else {
      // If request type is not specified or invalid, return an error response
      res.status(400).json({ error: 'Invalid request type. Please specify "cartype" or "biketype".' });
    }
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: 'An error occurred while fetching vehicle types' });
  }
};

const getAllVehicles = async (req, res) => {
  const { vehicle, typeId } = req.body;

  try {
    if (vehicle === 'cartype') {
      // Find vehicles based on car type
      const carType = await CarType.findOne({ where: { id: typeId } });

      if (!carType) {
        return res.status(404).json({ error: 'Car type not found' });
      }

      const vehicles = await Vehicle.findAll({ where: { type: vehicle, typeId: carType.id } });
      return res.json( vehicles );
    } else if (vehicle === 'biketype') {
      // Find vehicles based on bike type
      const bikeType = await BikeType.findOne({ where: { id: typeId } });

      if (!bikeType) {
        return res.status(404).json({ error: 'Bike type not found' });
      }

      const vehicles = await Vehicle.findAll({ where: { type: vehicle, typeId: bikeType.id } });
      return res.json(vehicles );
    } else {
      return res.status(400).json({ error: 'Invalid vehicle type. Must be "cartype" or "biketype".' });
    }
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return res.status(500).json({ error: 'An error occurred while fetching vehicles' });
  }

};

// Controller function to create a vehicles
const createVehicles = (req, res) => {
  // // Logic to create a new booking in the database
  // const newBooking = { id: bookings.length + 1, name: 'New Booking' };
  // bookings.push(newBooking);
  // res.json(newBooking);
};

module.exports = {
  getAllVehicles,
  getAllVehicleTypes,
  createVehicles
};
