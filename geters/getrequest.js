const mysql = require("mysql");
const request = require("../seters/setrequest")

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

exports.getrequest = function (func) {

    let query = "SELECT id from request WHERE finish_time > NOW();"

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result[0] !== undefined) {
                func(result[0].id);
                console.log("заявка уже есть")
            } else {
                // создание заказа
                request.setrequest((value)=>{
                    func(value)
                })
            }
            
        }
    });
};