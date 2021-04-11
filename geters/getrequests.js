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

exports.getrequests = function (func) {

    
    let query = "select request.id, request.start_time, request.finish_time ,ROUND (sum(user_request.cost* user_request.quantity),2) as summ  from specification join request on  specification.request_id = request.id join user_request on user_request.specification_id = specification.id  group by  request.id;"

    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result !== undefined) {
                func(result);
                console.log(result)
            } else {
                // // создание заказа
                // request.setrequest((value)=>{
                //     func(value)
                // })
            }
            
        }
    });
};