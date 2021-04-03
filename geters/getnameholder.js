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

exports.getnameholder = function (func) {
    let query = "SELECT name FROM holders;";
  
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        func(result);
      }
    });
  };