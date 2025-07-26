'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookingId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER
      },
      vendorId: {
        type: Sequelize.INTEGER
      },
      eventType: {
        type: Sequelize.STRING
      },
      venue: {
        type: Sequelize.STRING
      },
      eventDate: {
        type: Sequelize.DATE
      },
      bookingDate: {
        type: Sequelize.DATE
      },
      paymentStatus: {
        type: Sequelize.ENUM('pending', 'completed')
      },
      bookingStatus: {
        type: Sequelize.ENUM('pending', 'completed', 'cancelled')
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
