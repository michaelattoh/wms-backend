'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {
      // One vendor can have many products
      Vendor.hasMany(models.VendorProduct, {
        as: 'products',
        foreignKey: 'vendorId'
      });

      // One vendor can have many bookings (if you still use this)
      Vendor.hasMany(models.Booking, {
        foreignKey: 'vendorId'
      });
    }
  }

  Vendor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    about: DataTypes.TEXT,
    contact: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vendor',
  });

  return Vendor;
};
