const thickness = require("../geters/getthickness");
const steel = require("../geters/getsteel");
const nameholder = require("../geters/getnameholder");

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