// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Define routes with valid callback functions
router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);

module.exports = router;