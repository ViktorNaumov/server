const mysql = require("mysql");

 exports.log = function(value){

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

  let query = "INSERT INTO log values(null,'" + value + "', NOW());";

    connection.query(query, (err, result) => {
      if (err) console.log(err);
      
    });
  }
