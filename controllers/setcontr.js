const holders = require("../seters/setholders");
const stock = require("../seters/setstock");
const orderpayment = require("../seters/setorderpayment")

module.exports.holders = function (req, res) {
  if (req.body.value) {
    holders.setholders(req.body.value);
    res.json({ resultCode: 0 });
  }
};

module.exports.stock = function (req, res) {
  if (req) {
    stock.setstock(req.body.value);
    res.json({ resultCode: 0 });
  }
};

module.exports.orderpayment = function (req, res) {

  if (req.body.value) {
    orderpayment.setorderpayment(req.body.value, (value) => {
      if (value === 1) {

        // здесь вызов функции присвоения заявок и спецификаций


        res.json({ resultCode: 0 });
      }
    })
  }
}
