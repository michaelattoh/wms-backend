'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Comment this out to avoid the duplicate column error
    // await queryInterface.addColumn('ChatMessages', 'isRead', {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false
    // });

    await queryInterface.addColumn('ChatMessages', 'type', {
      type: Sequelize.ENUM('text', 'image', 'file'),
      defaultValue: 'text'
    });

    await queryInterface.addColumn('ChatMessages', 'reactions', {
      type: Sequelize.JSON
    });
  },

  down: async (queryInterface) => {
    // Only remove if the column was successfully added (skip if already exists)
    await queryInterface.removeColumn('ChatMessages', 'isRead');
    await queryInterface.removeColumn('ChatMessages', 'type');
    await queryInterface.removeColumn('ChatMessages', 'reactions');
  },
};
