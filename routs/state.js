const express = require("express");
const UserVerifiable = require("../models/UserVerifiable");
const router = express.Router();
const state = require("../state");
const log = require("../seters/log")

router.get("", (req, res) => {
  res.send(state);
  log.log("state",)
  // console.log("state был передан");
});

module.exports = router;
