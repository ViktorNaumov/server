const bcrypt = require("bcryptjs");
const mysql = require("mysql");

class User {
  constructor(data) {
    this.email = data.email;
    this.pass = data.pass;
    this.user_id = null;
  }

  findLoginUser(callback) {
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

    let query = "SELECT id FROM users where email = '" + this.email + "';";

    connection.query(query, (err, result) => {
      if (err) console.log(err);
      else {
        if (result[0]) {
          callback(result[0].id);
        } else {
          callback(false);
        }
      }
    });
    connection.end();
  }

  userLogin(id, callback) {
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

    let query = "SELECT password FROM users where id = '" + id + "';";

    connection.query(query, (err, result) => {
      if (err) console.log(err);
      else {
        if (result[0]) {
          const passwordResult = bcrypt.compareSync(
            this.pass,
            result[0].password
          );
          if (passwordResult) callback(id, passwordResult);
          else {
            callback(false);
          }
        } else {
          return console.log("Произошла какая то непредвиденная хуйня");
        }
      }
    });
    connection.end();
  }

  findById(id, callback) {
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

    let query = "SELECT email FROM users where id = '" + id + "';";

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
    connection.end();
  }

 
    
}
module.exports = User;
