'use strict';
require('dotenv').config()
module.exports = {
  async up (queryInterface, Sequelize) {
    // 建立的使用者數量
    const users = process.env.USERS ? parseInt(process.env.USERS) : 10000;
    // 每個使用者有 10 筆訂單（order）
    const orders = users * 10;
    // 要用正向/逆向來建立資料
    const createTableSort = process.env.CREATE_TABLE_SORT || 'positive ';
    // 每筆訂單下面有 10 個購買商品（item）
    
    if (createTableSort === 'positive') {
      let order_id = 0
      for (let i = 1; i <= users; i++) {
        var itemArray = [];
        for (let j = 1; j <= 10; j++) {
          order_id++
          for (let k = 1; k <= 10; k++) {
            const item = {
              name: `Dumpitem${i}-${j}-${k}`,
              price: Math.floor(Math.random() * 400),
              order_id: order_id,
              order_sn: `DumpOrder${i}-${j}`,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            itemArray.push(item);
          }
        }
        // 要分次執行，不然會報 EPIPE 的錯誤
        await queryInterface.bulkInsert('foreign_items', itemArray);
        await queryInterface.bulkInsert('index_items', itemArray);
        await queryInterface.bulkInsert('items', itemArray);
      }
    } else {
      let order_id = orders
      for (let i = users; i >= 1; i--) {
        var itemArray = [];
        for (let j = 10; j >= 1; j--) {
          for (let k = 10; k >= 1; k--) {
            const item = {
              name: `Dumpitem${i}-${j}-${k}`,
              price: Math.floor(Math.random() * 400),
              order_id: order_id,
              order_sn: `DumpOrder${i}-${j}`,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            itemArray.push(item);
          }
          order_id--
        }
        // 要分次執行，不然會報 EPIPE 的錯誤
        await queryInterface.bulkInsert('foreign_items', itemArray);
        await queryInterface.bulkInsert('index_items', itemArray);
        await queryInterface.bulkInsert('items', itemArray);
      }
    }

    if (createTableSort === 'positive') {
      let order_id = 0
      for (let i = 1; i <= users/10; i++) {
        var itemArray = [];
        for (let j = 1; j <= 10; j++) {
          order_id++
          for (let k = 1; k <= 10; k++) {
            const item = {
              name: `Dumpitem${i}-${j}-${k}`,
              price: Math.floor(Math.random() * 400),
              order_id: order_id,
              order_sn: `DumpOrder${i}-${j}`,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            itemArray.push(item);
          }
        }
        // 要分次執行，不然會報 EPIPE 的錯誤
        await queryInterface.bulkInsert('items', itemArray);
      }
    } else {
      let order_id = orders/10
      for (let i = users/10; i >= 1; i--) {
        var itemArray = [];
        for (let j = 10; j >= 1; j--) {
          for (let k = 10; k >= 1; k--) {
            const item = {
              name: `Dumpitem${i}-${j}-${k}`,
              price: Math.floor(Math.random() * 400),
              order_id: order_id,
              order_sn: `DumpOrder${i}-${j}`,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            itemArray.push(item);
          }
          order_id--
        }
        // 要分次執行，不然會報 EPIPE 的錯誤
        await queryInterface.bulkInsert('items', itemArray);
      }
    }

    return
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foreign_items', null, {});
    await queryInterface.bulkDelete('index_items', null, {});
    await queryInterface.bulkDelete('items', null, {});
    return
  }
};
