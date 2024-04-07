// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Define routes with valid callback functions
router.post('/', vehicleController.getAllVehicles);
router.post('/type', vehicleController.getAllVehicleTypes);
// router.post('/', vehicleController.createVehicle);

module.exports = router;