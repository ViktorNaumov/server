const fs = require("fs");
var mysql = require("mysql");
const pdf = require("html-pdf");
const pdfTemplate = require("./snipets/offer.js");
var Dxf = require("./dxf_creator");
const { Mailer } = require("./mailer.js");

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
let order;
let customer;
let update;
let param;

exports.ExportCreator = function (data) {
  let query1 =
    "SELECT id,name_org,inn,kpp,adress,tel FROM users WHERE email = '" +
    data.dataPush[0].email +
    "';";

  connection.query(query1, (err, result, field) => {
    customer = result[0];
    let query2 = "INSERT INTO orders values(null," + result[0].id + ", 0);";

    connection.query(query2, (err, result, field) => {
      for (let i = 1; i < data.dataPush.length; i++) {
        param = JSON.stringify(data.dataPush[i].param);
        console.log(param);

        let query =
          "INSERT INTO user_request (id,name,quantity,steel_id,thickness_id,config_id,params,weight,cost,dxf,date_time,orders_id,specification_id)" +
          " VALUES (" +
          null +
          ",'" +
          data.dataPush[i].name +
          "'," +
          data.dataPush[i].Q +
          "," +
          "(select id from steel where steel = '" +
          data.dataPush[i].steel +
          "')," +
          "(select id from thickness where thickness = " +
          data.dataPush[i].s +
          ")," +
          "(select id from config where config ='" +
          data.dataPush[i].type +
          "'),'" +
          param +
          "'," +
          data.dataPush[i].m +
          "," +
          data.dataPush[i].cost +
          "," +
          null +
          ",NOW()," +
          result.insertId +
          "," +
          null +
          ");";

        order = result.insertId;

        connection.query(query, (err, result, field) => {
          update = result.insertId;


          const dxfMaker = new Promise((resolve, reject) => {
            let str = Dxf.DxfCreator(
              data.dataPush[i].type,
              data.dataPush[i].param
            );
            resolve(str);
          });

          dxfMaker.then((value) => {
            let query =
              "UPDATE user_request SET dxf = '" +
              value +
              "' WHERE id = " +
              update +
              ";";
            fs.writeFile("./dxf/" + update + "_test.dxf", value, (err) => {
              if (err) console.log(err);
              else {
                console.log("File " + update + "_test.dxf" + " written");
              }
            });
            connection.query(query, (err, result, field) => {});
          });

          let query1 =
            "UPDATE user_request SET params='" +
            JSON.stringify(param) +
            "' WHERE id=" +
            update +
            ";";
          connection.query(query1, (err, result, field) => {});
        });
      }

      pdf
        .create(pdfTemplate.snipetHTML(data.dataPush, order, customer), {})
        .toFile("./pdf/" + order + ".pdf", (err) => {
          if (err) {
            console.log(err);
          }
          let message = {
            to: data.dataPush[0].email,
            subject: "Коммерческое предложение",
            text:
              "Здравствуйте, спасибо за заявку.\nДанное сообщение создано автоматически и не требует ответа.",
            from: '"Test" <viktornaumov2011@mail.ru>',
            attachments: [
              {
                filename: order + ".pdf",
                path: "./pdf/" + order + ".pdf",
              },
            ],
          };
          Mailer(message);
        });
    });
  });
};
