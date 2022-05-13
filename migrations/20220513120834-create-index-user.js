'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('index_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('index_users', ['name']));
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};