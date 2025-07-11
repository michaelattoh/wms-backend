'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.associate = function(models) {
        Vendor.hasMany(models.Booking, { foreignKey: 'vendorId' });
      }
    }
  }
  Vendor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    about: DataTypes.TEXT,
    contact: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};