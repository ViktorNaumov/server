const express = require("express");
const router = express.Router();
const state = require("../geters/getstate");
const log = require("../seters/log");

router.get("", (req, res) => {
  state.getstate((value) => {
    res.send(value);
    log.log("state");
  });
});

module.exports = router;
