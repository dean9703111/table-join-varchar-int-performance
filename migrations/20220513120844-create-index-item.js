'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('index_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      order_sn: {
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
    }).then(() => queryInterface.addIndex('index_items', ['price']))
    .then(() => queryInterface.addIndex('index_items', ['order_id']))
    .then(() => queryInterface.addIndex('index_items', ['order_sn']));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('index_items');
  }
};