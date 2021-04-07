const thickness = require("../geters/getthickness");
const steel = require("../geters/getsteel");
const nameholder = require("../geters/getnameholder");
const order = require("../geters/getorder")
const ordercost = require("../geters/getordercost")
const orderpayment = require("../geters/getorderpayment")

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
  order.getorder(req.body.value, (value) => {
    if (value) {
      if (value[0] !== undefined) {
        if (value[0].id)
          res.json({ resultCode: 0, value: value[0] });
      } else {
        res.json({ resultCode: 1 });
      }
    }
  });
};

module.exports.ordercost = function (req, res) {

  ordercost.getordercost(req.body.value, (value) => {
    if (value) {
      console.log(req.body.value.cost)
      console.log(value)
      if (value == req.body.value.cost) {
        res.json({ resultCode: 0, value: true })
      } else {
        res.json({ resultCode: 1 });
      }
    }

  })
}

module.exports.orderpayment = async function (req, res) {
  orderpayment.getorderpayment(req.body.value, (value) => {
    if (value === 1) {
      res.json({ resultCode: 0 })
    } else {
      res.json({ resultCode: 1 });
    }

  })

}

