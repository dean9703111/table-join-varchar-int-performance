'use strict';
require('dotenv').config()
module.exports = {
  async up (queryInterface, Sequelize) {
    // 建立的使用者數量
    const users = process.env.USERS ? parseInt(process.env.USERS) : 10000;
    // 要用正向/逆向來建立資料
    const createTableSort = process.env.CREATE_TABLE_SORT || 'positive ';


    let order_id = 1;
    if (createTableSort === 'positive') {
      for (let i = 1; i <= users; i++) {
        var orderArray = [];
        for (let j = 1; j <= 10; j++) {
          let order = {
            sn: `DumpOrder${i}-${j}`,
            user_id: i,
            user_name: `DumpUser${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          orderArray.push(order);
        }
        await queryInterface.bulkInsert('foreign_orders', orderArray);
        await queryInterface.bulkInsert('index_orders', orderArray);
      }
    } else {
      for (let i = users; i >= 1; i--) {
        var orderArray = [];
        for (let j = 10; j >= 1; j--) {
          let order = {
            sn: `DumpOrder${i}-${j}`,
            user_id: i,
            user_name: `DumpUser${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          orderArray.push(order);
        }
        await queryInterface.bulkInsert('foreign_orders', orderArray);
        await queryInterface.bulkInsert('index_orders', orderArray);
      }
    }

    // 沒有建立 index 量級不能超過 10W，一超過會等到天荒地老
    if (createTableSort === 'positive') {
      for (let i = 1; i <= users/10; i++) {
        var orderArrayId = [];
        for (let j = 1; j <= 10; j++) {
          let orderId = {
            sn: `DumpOrder${i}-${j}`,
            user_id: i,
            order_id: order_id,
            user_name: `DumpUser${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          orderArrayId.push(orderId);
          order_id++
        }
        await queryInterface.bulkInsert('orders', orderArrayId);
      }
    } else {
      for (let i = users/10; i >= 1; i--) {
        var orderArrayId = [];
        for (let j = 10; j >= 1; j--) {
          let orderId = {
            sn: `DumpOrder${i}-${j}`,
            user_id: i,
            order_id: order_id,
            user_name: `DumpUser${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          orderArrayId.push(orderId);
          order_id++
        }
        await queryInterface.bulkInsert('orders', orderArrayId);
      }
    }


    return;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foreign_orders', null, {});
    await queryInterface.bulkDelete('index_orders', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    return
  }
};
