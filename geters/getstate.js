const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "plasmacut2",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("База данных подключена");
  }
});

exports.getstate = function (func) {
  let query =
    "SELECT steel.steel, thickness.thickness, stock.cost, stock.costcut, holders.param FROM stock " +
    "JOIN steel on stock.steel_id = steel.id JOIN thickness on stock.thickness_id = thickness.id JOIN holders " +
    "ON stock.holders_id = holders.id WHERE stock.availability = 1;";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      func(result);
    }
  });
};
