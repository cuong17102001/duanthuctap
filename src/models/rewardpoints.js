'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RewardPoints extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RewardPoints.init({
    idEmployee: DataTypes.INTEGER,
    idCriteria : DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    
    date:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RewardPoints',
  });
  return RewardPoints;
};