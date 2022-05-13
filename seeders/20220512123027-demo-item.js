'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const createTableSort = process.env.CREATE_TABLE_SORT || 'positive ';
    // 每筆訂單下面有 10 個購買商品（item）
    
    if (createTableSort === 'positive') {
      let order_id = 0
      for (let i = 1; i <= 10000; i++) {
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
        await queryInterface.bulkInsert('Items', itemArray);
      }
    } else {
      let order_id = 100000
      for (let i = 10000; i >= 1; i--) {
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
        await queryInterface.bulkInsert('Items', itemArray);
      }
    }

    return
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
