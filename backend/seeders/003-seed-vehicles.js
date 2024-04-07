'use strict';
const { Vehicle } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add seed data for vehicles
        await Vehicle.bulkCreate([
            { name: 'BMW 6 Series', type: 'carType', typeId: 1, availability: false }, // Assuming typeId 1 corresponds to Hatchback
            { name: 'Mahindra Thar', type: 'carType', typeId: 2, availability: true }, // Assuming typeId 2 corresponds to SUV
            { name: 'BMW i7', type: 'carType', typeId: 3, availability: true }, // Assuming typeId 3 corresponds to Sedan
            { name: 'Harley-Davidson X440', type: 'bikeType', typeId: 1, availability: true }, // Assuming bikeTypeId 1 corresponds to Cruiser
            // Add more vehicles as needed
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Remove seed data for vehicless
        await Vehicle.destroy({ where: {} });
    }
};