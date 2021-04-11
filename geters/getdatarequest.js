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

exports.getdatarequest = function (value,func) {
    console.log(value)

    
    let query = "select request.id as request, user_request.id as userrequest, user_request.quantity, steel.steel, thickness.thickness, config.config, user_request.params, specification.id as specification from user_request "+ 
    "join steel on user_request.steel_id = steel.id "+ 
    "join thickness on user_request.thickness_id = thickness.id "+
    "join specification on user_request.specification_id = specification.id "+
    "join request on specification.request_id = request.id "+
    "join config on user_request.config_id = config.id "+ 
    "Where request.id = "+value+";"

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result !== undefined) {
                func(result);
            } else {
               
            }
            
        }
    });
};