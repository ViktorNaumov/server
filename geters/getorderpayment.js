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

exports.getorderpayment = function (value, func) {
  
  let query = "SELECT payment FROM orders where id = "+value+";"

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      func(result[0].payment);
    }
  });
};