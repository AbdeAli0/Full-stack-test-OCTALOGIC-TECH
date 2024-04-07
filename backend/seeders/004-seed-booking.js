'use strict';
const { Booking } = require('../models');

var currentDate = new Date();

// currentDate.setDate(currentDate.getDate() + 1)

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add seed data for booking
        await Booking.bulkCreate([
            {
                firstName: 'Abde',
                lastName: 'Ali',
                type: 'carType',
                typeId: 1,
                modelName: 'BMW 6 Series',
                bookingStart: currentDate.toString(),
                bookingEnd: new Date(currentDate.setDate(currentDate.getDate() + 1)).toString()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Remove seed data for bookings
        await Booking.destroy({ where: {} });
    }
};