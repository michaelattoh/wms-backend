'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Vendor Queen',
        email: 'queen@vendors.com',
        password: 'hashedpassword',
        role: 'vendor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User King',
        email: 'king@users.com',
        password: 'hashedpassword',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
  
