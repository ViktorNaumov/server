const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const { Mailer } = require("../mailer");

class Condidat {
  constructor(data) {
    this.email = data.email;
    this.pass = data.pass;
    this.INN = data.INN;
    this.KPP = data.KPP;
    this.name = data.name;
    this.adress = data.adress;
    this.tel = data.tel;
    this.name_org = data.name_org;
  }
  userFind(f) {
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

    let query = "SELECT id FROM users where email ='" + this.email + "';";
    let a;
    connection.query(query, (err, result, field) => {
      console.log(this.email);
      if (err) console.log(err);
      else {
        console.log(result);
        if (result[0]) {
          a = JSON.parse(result[0].id);
          f(a);
        } else {
          f(false);
        }
      }
    });
    connection.end();
  }
  userRegister() {

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
        const salt = bcrypt.genSaltSync(11);
        const hashpass = bcrypt.hashSync(this.pass, salt);
        let query =
          "INSERT INTO users values (null,'" +
          this.name +
          "','" +
          this.email +
          "','" +
          hashpass +
          "','" +
          this.tel +
          "','" +
          this.INN +
          "','" +
          this.KPP +
          "','" +
          this.name_org +
          "','" +
          this.adress +
          "',0);";
        connection.query(query, (err, result, field) => {
          if (err) console.log(err);
          else {
            console.log(result+"BD");
            const hashemail = bcrypt.hashSync(this.email, salt);
            let message = {
              to: this.email,
              subject: "Подтверждение регистрации",
              text:
                "Здравствуйте, спасибо за заявку.\nДанное сообщение создано автоматически и не требует ответа.",
              from: '"Test" <viktornaumov2011@mail.ru>',
              html: `<a href='http://localhost:3012/api/auth/check?id=${result.insertId}&hash=${hashemail}'>для подтверждения пройдите по этой ссылке</a>`,
            };
            Mailer(message);
          }
        });
      }
    });

    // connection.end();
  }
}
module.exports = Condidat;
