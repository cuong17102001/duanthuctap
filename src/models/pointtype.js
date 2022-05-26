'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PointType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PointType.init({
    
    name: DataTypes.STRING,
    point: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'PointType',
  });
  return PointType;
};