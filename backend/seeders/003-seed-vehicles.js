'use strict';
const { Vehicle } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add seed data for vehicles
        await Vehicle.bulkCreate([
            { name: 'BMW 6 Series', type: 'cartype', typeId: 1, availability: false }, // Assuming typeId 1 corresponds to Hatchback
            { name: 'Mahindra Thar', type: 'cartype', typeId: 2, availability: true }, // Assuming typeId 2 corresponds to SUV
            { name: 'BMW i7', type: 'cartype', typeId: 3, availability: true }, // Assuming typeId 3 corresponds to Sedan
            { name: 'Harley-Davidson X440', type: 'biketype', typeId: 1, availability: true }, // Assuming bikeTypeId 1 corresponds to Cruiser
            { name: 'Honda CB650R', type: 'biketype', typeId: 2, availability: true }, // Assuming bikeTypeId 1 corresponds to Sports
            // Add more vehicles as needed
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Remove seed data for vehicless
        await Vehicle.destroy({ where: {} });
    }
};