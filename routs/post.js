const express = require("express");
const controller = require('../controllers/post')
const router = express.Router();

router.post("/post",controller.post)

module.exports = router;
