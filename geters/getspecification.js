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
  let query =
    "select distinct steel.steel, thickness.thickness from user_request" +
    " join steel on user_request.steel_id =steel.id" +
    " join thickness on user_request.thickness_id = thickness.id where user_request.orders_id = " +
    value.number +
    " ;";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      
      for (let i = 0; i < result.length; i++) {
          let steel = result[i].steel;
          console.log(steel)
          let thickness = result[i].thickness;
          console.log(thickness)
        let query =
          "select id from specification where steel_id = (select id from steel where steel = '" +
          steel +
          "')" +
          " and thickness_id = (select id from thickness where thickness = " +
          thickness +
          ");";
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
          } else {
              console.log(result)
            if (result[i] == undefined) {
              let query =
                "insert into specification values" +
                "(null,(select id from steel where steel = '"+steel+"'),(select id from thickness where thickness = "+thickness+"), " +
                requestid +
                ");";

                connection.query(query, (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {

                    }
                })

            }
          }
        });
      }
    }
  });
};
