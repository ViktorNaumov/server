const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const authRouts = require("./routs/auth");
const userPostRouts = require("./routs/post");
const stateRouts = require("./routs/state");
const setRouts = require("./routs/set")
const getRouts = require("./routs/get")
const app = express();

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static("public"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set("trust proxy", 1); // trust first proxy

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/auth", authRouts);
app.use("/push", userPostRouts);
app.use("/state", stateRouts);
app.use("/api/set", setRouts);
app.use("/api/get", getRouts)



module.exports = app;
