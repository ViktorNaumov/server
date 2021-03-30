const mysql = require("mysql");

class UserVerifiable {
  constructor(decoded) {
    this.email = decoded.email;
    this.user_id = decoded.user_id;
    this.iat = decoded.iat;
    this.exp = decoded.exp;
  }

  findUserById(callback) {
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

    let query = "SELECT email,mail_check FROM users where id = '" + this.user_id + "';";

    connection.query(query, (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result[0])
        if (result[0]) {
          callback(result[0].email,result[0].mail_check);
        } else {
          console.log("что то не так");
          callback(false);
        }
      }
    });
    connection.end();
  }
}
module.exports = UserVerifiable;
