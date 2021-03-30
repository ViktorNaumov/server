const mysql = require("mysql");

class Check {
  constructor(data) {
    this.id = data.id;
  }

  check() {
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

    let query = "UPDATE users SET mail_check = 1 where id = '" + this.id + "';";

    connection.query(query, (err, result) => {
      if (err) console.log(err);
      // else {
      //   if (result[0]) {
      //     callback(result[0].email);
      //   } else {
      //     console.log("что то не так");
      //     callback(false);
      //   }
      // }
    });
  }

  findById(callback) {
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

    let query = "SELECT email FROM users where id = '" + this.id + "';";

    connection.query(query, (err, result) => {
      if (err) console.log(err);
      else {
        if (result[0]) {
          callback(result[0].email);
        } else {
          console.log("что то не так");
          callback(false);
        }
      }
    });
    // connection.end();
}
}
module.exports = Check;
