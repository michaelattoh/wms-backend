'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Vendors', 'category', {
      type: Sequelize.STRING,
      allowNull: true, // or false if required
    });
    await queryInterface.addColumn('Vendors', 'address', {
      type: Sequelize.STRING,
      allowNull: true, // or false if required
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Vendors', 'category');
    await queryInterface.removeColumn('Vendors', 'address');
  }
};