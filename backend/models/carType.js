// models/carType.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarType extends Model {
    static associate(models) {
      CarType.hasMany(models.Vehicle, { foreignKey: 'typeId' });
    }
  }
  CarType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CarType',
  });
  return CarType;
};
