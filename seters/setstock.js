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

exports.setstock = function (value) {
  console.log(value);
let availability;
  if (value.forsale) {
     availability = 1;
  } else {
     availability = 0;
  }

  let query =
    "INSERT INTO stock values (null,(select id from steel where steel = '" +
    value.steel +
    "')" +
    ",(select id from thickness where thickness = " +
    value.thickness +
    ")," +
    value.cost +
    "," +
    value.costcut +
    "," +
    " (select id from holders where name = '" +
    value.Nameholder +
    "'), " +
    availability +
    " );";

    connection.query(query, (err, result) => {
        if (err) console.log(err)
      });
};
