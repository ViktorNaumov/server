const express = require("express");
const controller = require('../controllers/setcontr')
const router = express.Router();

router.post("/holders",controller.holders)

module.exports = router;
