const setstock = require("../seters/setstock")

module.exports.holders = function(req,res){  
    console.log(req.body.value)

    res.json({resultCode : 0})
}