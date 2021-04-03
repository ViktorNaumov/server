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

exports.getthickness = function (func) {

  let query = "SELECT thickness FROM thickness;";

  connection.query(query, (err, result) => {
    if (err) {
        console.log(err);  
    }else{
        console.log(result)
        func(result)
    }
  });
};
