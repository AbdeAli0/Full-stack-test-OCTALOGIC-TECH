// app.js
const express = require('express');
const app = express();
const models = require('./models'); // Require the models index file

// Middleware
app.use(express.json());

// Load routes
const bookingRoutes = require('./routes/bookingRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

// Routes
app.use('/booking', bookingRoutes);
app.use('/vehicles', vehicleRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
