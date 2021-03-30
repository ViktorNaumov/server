const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Condidat = require("../models/condidat");
const User = require("../models/user");
const keys = require("../config/keys");
const UserVerifiable = require("../models/UserVerifiable");
const Check = require("../models/check");

module.exports.login = async function (req, res) {
  const user = new User(req.body.loginValues);

  const fc = (id, a) => {
    if (a) {
      const token = jwt.sign(
        {
          email: user.email,
          user_id: id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 * 3 }
      );

      console.log("Пароль подошёл");
      res.status(200).json({
        message: "Вы авторизованы",
        token: `Bearer ${token}`,
        resultCode: 0,
        email: user.email,
      });
    } else {
      console.log("Пароль не подошёл");

      res.status(401).json({
        message: "Неверный пароль. Вы не авторизованы",
        resultCode: 1,
      });
      // console.log(res)
    }
  };

  const fs = (id) => {
    if (id) {
      user.userLogin(id, fc);
    } else {
      console.log("Неверный логин");
      return res
        .status(401)
        .json({ message: "Данный email в системене зарегистрирован" });
    }
  };
  user.findLoginUser(fs);
};

module.exports.register = async function (req, res) {
  console.log(req);

  const condidate = new Condidat(req.body.registrationValues);

  const f = (a) => {
    if (a)
      return res.status(409).json({
        resultCode: 1,
        message: "Такой email уже занят. Попробуйте другой",
      });
    else {
      try {
        condidate.userRegister();
        return res
          .status(201)
          .json({ resultCode: 0, message: "Пользователь создан" });
      } catch (e) {}
    }
  };
  condidate.userFind(f);
};

module.exports.me = function (req, res) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, keys.jwt);
    console.log(decoded);
    if (decoded) {
      const user = new UserVerifiable(decoded);
      // проверяем соответствие данных токена базе данных
      user.findUserById((email) => {
        if (email) {
          if (email === decoded.email) {
            return res.status(200).json({
              resultCode: 0,
              user_id: decoded.user_id,
              email: decoded.email,
            });
          } else {
            return res.status(401).json({ responseCode: 1 });
          }
        } else {
          return res.status(401).json({ resultCode: 1 });
        }
      });
    } else {
      return res.status(401).json({ resultCode: 1 });
    }
  } else {
    return res.status(401).json({ resultCode: 1 });
  }
};

module.exports.check = function (req, res) {
  console.log(req.query)
  let hash = req.query.hash;
  const check = new Check(req.query);
  check.findById((email) => {
    if (email) {
      const emailResult = bcrypt.compareSync(email, hash);
      if (emailResult) {
        check.check()
        res.redirect('http://localhost:3000/ok')
      }
    }
  });
};
