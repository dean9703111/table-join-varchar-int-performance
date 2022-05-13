const { sequelize } = require("./models");
const { QueryTypes } = sequelize;

async function joinIntFindOne () {
    console.time("joinIntFindOne");
    const results = await sequelize.query("SELECT * FROM users\
         LEFT JOIN orders ON orders.user_id = users.id\
         LEFT JOIN items ON items.order_id = orders.id\
         WHERE items.name = 'Dumpitem5000-10-10'", { type: QueryTypes.SELECT });
    console.timeEnd("joinIntFindOne");
}
async function joinIntSearchRange () {
    console.time("joinIntSearchRange");
    const results = await sequelize.query("SELECT * FROM users\
         LEFT JOIN orders ON orders.user_id = users.id\
         LEFT JOIN items ON items.order_id = orders.id\
         WHERE items.price < 200", { type: QueryTypes.SELECT });
    console.timeEnd("joinIntSearchRange");
}
async function joinVarcharFindOne () {
    console.time("joinVarcharFindOne");
    const results = await sequelize.query("SELECT * FROM users\
           LEFT JOIN orders ON orders.user_name = users.name\
           LEFT JOIN items ON items.order_sn = orders.sn\
           WHERE items.name = 'Dumpitem5000-10-10'", { type: QueryTypes.SELECT });
    console.timeEnd("joinVarcharFindOne");
}
async function joinVarcharSearchRange () {
    console.time("joinVarcharSearchRange");
    const results = await sequelize.query("SELECT * FROM users\
           LEFT JOIN orders ON orders.user_name = users.name\
           LEFT JOIN items ON items.order_sn = orders.sn\
           WHERE items.price < 200", { type: QueryTypes.SELECT });
    console.timeEnd("joinVarcharSearchRange");
}
joinIntFindOne();
joinIntSearchRange();

joinVarcharFindOne();
joinVarcharSearchRange();
