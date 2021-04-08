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

exports.setrequest = function ( func) {

    let query = "INSERT request VALUES(null,NOW(),ADDDATE(Now(),INTERVAL (SELECT days from time_interval where name = 'request') DAY) );"

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            func(result.insertId)
        }
    });
};