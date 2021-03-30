const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const UserVerifiable = require("../models/UserVerifiable");
const ExportCreator = require("../orderCreator");


module.exports.post = function (req, res) {
  console.log(req.headers.authorization)
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, keys.jwt);
    // console.log(req.body)
    // console.log(decoded);
// console.log(res)
    if (decoded) {
      const user = new UserVerifiable(decoded);
      // проверяем соответствие данных токена базе данных
      user.findUserById((email,mail_check) => {

      console.log("mail_check"+mail_check)
        if (email) {
          // сравниваем
          if (email === decoded.email && mail_check===1) {
            ExportCreator.ExportCreator(req.body);
            // console.log(req)
            res.json({resultCode : 0})
          } else {
            res
              // .sendStatus(401)
              .json({ massage: "вы не авторизованы. авторизуйтесь", resultCode:1});
          }
        } else {
          res.sendStatus(401).json({ massage: "вы не авторизованы. авторизуйтесь"});
        }
      });
    } else {
      res.sendStatus(401).json({ massage: "вы не авторизованы"});
    }
  } else {
    res.sendStatus(401).json({ massage: "вы не авторизованы" });
  }
};
