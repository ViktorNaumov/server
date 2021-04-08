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

exports.getspecification = function (func) {

    let query = "select distinct steel.steel, thickness.thickness from user_request"+ 
    " join steel on user_request.steel_id =steel.id"+ 
    " join thickness on user_request.thickness_id = thickness.id;"

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
          console.log(result)  
            
        }
    });
};