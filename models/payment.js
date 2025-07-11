'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.associate = function(models) {
        Payment.belongsTo(models.User, { foreignKey: 'userId' });
        Payment.belongsTo(models.Booking, { foreignKey: 'bookingId' });
      }
    }
  }
  Payment.init({
    bookingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    method: DataTypes.STRING,
    transactionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};