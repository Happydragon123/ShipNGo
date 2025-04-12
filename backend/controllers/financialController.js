const db = require("mysql2").createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise();

// async function getSumPackageTransactions(){
//     const [rows] = await db.query("SELECT SUM(cost) AS cost FROM packages");
//     return rows;
// }
  
// async function getAllPackageTransactions(){
//     const [rows] = await db.query();
// }

async function getSumTransactions(){
    const [rows] = await db.query("SELECT SUM(total_cost) AS total_sum FROM supplytransactions");
    return rows;
}

async function getAllTransactions(){
    const [rows] = await db.query(
        "SELECT ST.supply_transaction_id, C.name, S.category, ST.quantity, ST.total_cost, ST.purchase_date FROM customers AS C, supplies AS s, supplytransactions AS ST WHERE C.customer_id = ST.user_id AND S.supply_id = ST.supply_id");
    return rows;
}

// async function getSumInsurance(){
//     const [rows] = await db.query("SELECT SUM(insurance_fee) AS insurance_fee FROM insurancepolicies ");
// }

// async function getAllInsuranceTransactions(){
//     const [rows] = await db.query("SELECT I.insurance_id I.package_id");
// }

  module.exports = {
    getSumTransactions,
    getAllTransactions
  };