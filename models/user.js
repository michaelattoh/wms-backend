'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.associate = function(models) {
        User.hasMany(models.Booking, { foreignKey: 'userId' });
        User.hasMany(models.Payment, { foreignKey: 'userId' });
      }
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    google_id: DataTypes.STRING,
    apple_id: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('user', 'vendor', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
    return User;
};