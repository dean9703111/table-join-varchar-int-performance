'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const createTableSort = process.env.CREATE_TABLE_SORT || 'positive ';
    // 每個使用者有 10 筆訂單（order）
    var orderArray = [];
    if (createTableSort === 'positive') {
      for (let i = 1; i <= 10000; i++) {
        for (let j = 1; j <= 10; j++) {
          const order = {
            sn: `DumpOrder${i}-${j}`,
            user_id: i,
            user_name: `DumpUser${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          orderArray.push(order);
        }
      }
    } else {
      for (let i = 10000; i >= 1; i--) {
        for (let j = 10; j >= 1; j--) {
          const order = {
            sn: `DumpOrder${i}-${j}`,
            user_id: i,
            user_name: `DumpUser${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          orderArray.push(order);
        }
      }
    }


    return queryInterface.bulkInsert('Orders', orderArray);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
