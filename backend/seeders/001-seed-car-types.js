'use strict';
const { CarType } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed data for car types
    await CarType.bulkCreate([
      { name: 'Hatchback' },
      { name: 'SUV' },
      { name: 'Sedan' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seed data for car types
    await CarType.destroy({ where: {} });
  }
};
