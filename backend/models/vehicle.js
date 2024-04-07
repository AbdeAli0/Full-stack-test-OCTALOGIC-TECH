// models/vehicle.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.belongsTo(models.CarType, { foreignKey: 'typeId' });
    }
  }
  Vehicle.init({
    name: {
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
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};
