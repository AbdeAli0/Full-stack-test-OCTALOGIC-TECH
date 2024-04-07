// models/bikeType.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BikeType extends Model {
    static associate(models) {
      // define association here
    }
  }
  BikeType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BikeType',
  });
  return BikeType;
};
