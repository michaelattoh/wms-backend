'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Booking.hasOne(models.Payment, { foreignKey: 'bookingId', as: 'payment' });
      Booking.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
    }
  }

  Booking.init({
    bookingId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: DataTypes.INTEGER,
    vendorId: DataTypes.INTEGER,
    eventType: DataTypes.STRING,
    venue: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    bookingDate: DataTypes.DATE,
    paymentStatus: DataTypes.ENUM('pending', 'completed'),
    bookingStatus: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
