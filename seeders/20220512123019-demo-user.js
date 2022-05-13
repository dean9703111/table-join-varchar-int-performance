'use strict';
require('dotenv').config()
module.exports = {
  async up (queryInterface, Sequelize) {
    // 建立的使用者數量
    const users = process.env.USERS ? parseInt(process.env.USERS) : 10000;

    var userArray = [];
    var userArrayId = [];

    for (let i = 1; i <= users; i++) {
      const user = {
        name: `DumpUser${i}`,
        mail: `fake${i}@baobao.com`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      userArray.push(user);
    }
    for (let i = 1; i <= users / 10; i++) {
      const userId = {
        name: `DumpUser${i / 10}`,
        user_id: i / 10,
        mail: `fake${i / 10}@baobao.com`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      userArrayId.push(userId)
    }

    await queryInterface.bulkInsert('foreign_users', userArray);
    await queryInterface.bulkInsert('index_users', userArray);
    await queryInterface.bulkInsert('users', userArrayId);

    return
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foreign_users', null, {});
    await queryInterface.bulkDelete('index_users', null, {});
    await queryInterface.bulkDelete('users', null, {});
    return
  }
};
