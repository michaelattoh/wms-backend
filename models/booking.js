'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.associate = function(models) {
        Booking.belongsTo(models.User, { foreignKey: 'userId' });
        Booking.hasOne(models.Payment, { foreignKey: 'bookingId' });
        Booking.belongsTo(models.Vendor, { foreignKey: 'vendorId' });
      }
    }
  }
  Booking.init({
    userId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};