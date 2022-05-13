'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('foreign_orders', {
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
        type: Sequelize.INTEGER,
        references: {
          model: 'foreign_users',
          key: 'id'
        },
      },
      user_name: {
        type: Sequelize.STRING,
        references: {
          model: 'foreign_users',
          key: 'name'
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
    }).then(() => queryInterface.addIndex('foreign_orders', ['sn']));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('foreign_orders');
  }
};