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

exports.getspecification = function (requestid, value, func) {
  let query = `CALL set_specification(${value.number},${requestid});`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      func(result[0]);
    }
  });
};

exports.setspecification = function (requestid, order, func) {
  console.log(order,requestid)
  let query = `CALL set_user_request_spec(${order},${requestid});`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      func(true);
    }
  });
};
