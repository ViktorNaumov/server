const thickness = require("../geters/getthickness");
const steel = require("../geters/getsteel");
const nameholder = require("../geters/getnameholder");
const order = require("../geters/getorder")
const ordercost = require("../geters/getordercost")

module.exports.thickness = function (req, res) {
  thickness.getthickness((value) => {
    if (value) {
      res.json({ resultCode: 0, value: value });
    }
  });
};

module.exports.steel = function (req, res) {
  steel.getsteel((value) => {
    if (value) {
      res.json({ resultCode: 0, value: value });
    }
  });
};

module.exports.nameholder = function (req, res) {
  nameholder.getnameholder((value) => {
    if (value) {
      res.json({ resultCode: 0, value: value });
    }
  });
};

module.exports.order = function (req, res) {
  order.getorder(req.body.value,(value) => {
    if (value) {
      if(value[0] !== undefined){
        if(value[0].id )
      res.json({ resultCode: 0, value: value[0] });
      } else{
        res.json({ resultCode: 1});  
      } 
    }
  });
};

module.exports.ordercost = function (req, res){

}

