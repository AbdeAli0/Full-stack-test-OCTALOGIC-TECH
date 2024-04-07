'use strict';
const { BikeType } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed data for bike types
    await BikeType.bulkCreate([
      { name: 'Cruiser' },
      { name: 'Sports' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seed data for bike types
    await BikeType.destroy({ where: {} });
  }
};
