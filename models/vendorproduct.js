'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VendorProduct extends Model {
    static associate(models) {
      // Associate with Vendor
      VendorProduct.belongsTo(models.Vendor, {
        as: 'vendor',
        foreignKey: 'vendorId'
      });
    }
  }

  VendorProduct.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    sizes: DataTypes.STRING,
    tags: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: DataTypes.TEXT,
    features: DataTypes.TEXT,
    actualPrice: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    publishDateTime: DataTypes.DATE,
    vendorId: DataTypes.INTEGER  // Make sure this is here!
  }, {
    sequelize,
    modelName: 'VendorProduct',
  });

  return VendorProduct;
};
