// models/booking.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Booking.belongsTo(models.User); // Example: Booking belongs to a User
      Booking.belongsTo(models.Vehicle); // Example: Booking belongs to a Vehicle
    }
  }
  Booking.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookingStart: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'undefined'
    },
    bookingEnd: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
