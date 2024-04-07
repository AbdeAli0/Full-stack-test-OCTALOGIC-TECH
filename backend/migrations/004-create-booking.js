'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'undefined'
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CarTypes',
          key: 'id'
        }
      },
      modelName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bookingStart: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookingEnd: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookingss');
  }
};
