const { sequelize } = require("./models");
const { QueryTypes } = sequelize;
function getJoinCol (colType, setting) {
    let orderJoinCol = "";
    let itemJoinCol = ""
    if (setting === "" && colType === "Int") {
        orderJoinCol = `orders.user_id = users.user_id`
        itemJoinCol = `items.order_id = orders.order_id`
    } else if (colType === "Int") {
        orderJoinCol = `${setting}orders.user_id = ${setting}users.id`
        itemJoinCol = `${setting}items.order_id = ${setting}orders.id`
    } else if (colType === "VarChar") {
        orderJoinCol = `${setting}orders.user_name = ${setting}users.name`
        itemJoinCol = `${setting}items.order_sn = ${setting}orders.sn`
    }
    return { "orderJoinCol": orderJoinCol, "itemJoinCol": itemJoinCol }
}
async function findOne (colType, setting) {
    console.time(`${colType}-${setting}FindOne`);
    let {orderJoinCol,itemJoinCol} = getJoinCol (colType, setting)
    const results = await sequelize.query(`SELECT 
           ${setting}users.name, ${setting}items.price FROM ${setting}users
           LEFT JOIN ${setting}orders ON ${orderJoinCol}
           LEFT JOIN ${setting}items ON ${itemJoinCol}
           WHERE ${setting}items.name = 'Dumpitem5000-10-10'`, { type: QueryTypes.SELECT });
    console.timeEnd(`${colType}-${setting}FindOne`);
}
async function findMutiple (colType, setting) {
    console.time(`${colType}-${setting}FindMutiple`);
    let {orderJoinCol,itemJoinCol} = getJoinCol (colType, setting)
    const results = await sequelize.query(`SELECT 
           ${setting}users.name, ${setting}items.price FROM ${setting}users
           LEFT JOIN ${setting}orders ON ${orderJoinCol}
           LEFT JOIN ${setting}items ON ${itemJoinCol}
           WHERE ${setting}items.name in 
            ('Dumpitem3000-10-10','Dumpitem5000-10-10','Dumpitem7500-10-10')`
        , { type: QueryTypes.SELECT });
    console.timeEnd(`${colType}-${setting}FindMutiple`);
}
async function searchRange (colType, setting) {
    console.time(`${colType}-${setting}SearchRange`);
    let {orderJoinCol,itemJoinCol} = getJoinCol (colType, setting)
    const results = await sequelize.query(`SELECT 
           ${setting}users.name, ${setting}items.price FROM ${setting}users
           LEFT JOIN ${setting}orders ON ${orderJoinCol}
           LEFT JOIN ${setting}items ON ${itemJoinCol}
           WHERE ${setting}items.price < 80`, { type: QueryTypes.SELECT });
    console.timeEnd(`${colType}-${setting}SearchRange`);
}

function test (type) {
    switch (type) {
        case 'foreign':
            findOne("Int", "foreign_");
            findMutiple("Int", "foreign_");
            searchRange("Int", "foreign_");
            findOne("VarChar", "foreign_");
            findMutiple("VarChar", "foreign_");
            searchRange("VarChar", "foreign_");
            break;
        case 'index':
            findOne("Int", "index_");
            findMutiple("Int", "index_");
            searchRange("Int", "index_");
            findOne("VarChar", "index_");
            findMutiple("VarChar", "index_");
            searchRange("VarChar", "index_");
            break;
        default:
            findOne("Int", "");
            findMutiple("Int", "");
            searchRange("Int", "");
            findOne("VarChar", "");
            findMutiple("VarChar", "");
            searchRange("VarChar", "");
    }
}

// test("foreign")//有建立 foreign Key 的
// test("index")//有建立 index 的
test()//什麼都沒有設定的