'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('index_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sn: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('index_orders', ['sn']))
    .then(() => queryInterface.addIndex('index_orders', ['user_id']))
    .then(() => queryInterface.addIndex('index_orders', ['user_name']));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};