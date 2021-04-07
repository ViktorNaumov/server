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

exports.setorderpayment = function (value, func) {

    let query = "UPDATE orders SET payment = 1 where id =" + value.number + ";"

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            func(result.changedRows)
        }
    });
};
