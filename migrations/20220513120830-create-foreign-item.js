'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('foreign_items', {
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
        references: {
          model: 'foreign_orders',
          key: 'id'
        },
      },
      order_sn: {
        type: Sequelize.STRING,
        references: {
          model: 'foreign_orders',
          key: 'sn'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('foreign_items', ['price']));;
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('foreign_items');
  }
};