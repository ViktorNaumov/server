const holders = require("../seters/setholders");
const  stock  = require("../seters/setstock");

module.exports.holders = function (req, res) {
  if (req.body.value) {
    console.log(req.body.value);
    holders.setholders(req.body.value);
    res.json({ resultCode: 0 });
  }
};

module.exports.stock = function (req, res) {
  console.log("req");
  if (req) {
    stock.setstock(req.body.value);
    console.log(req.body.value);
    res.json({ resultCode: 0 });
  }
};
