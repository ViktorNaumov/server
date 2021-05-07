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

exports.getordercost = function (value, func) {
  
  let query = "SELECT ROUND(sum(ROUND(cost,2)*quantity),2) as summ FROM user_request where orders_id = "+value.number+";"

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      
      func(result[0].summ);
    }
  });
};