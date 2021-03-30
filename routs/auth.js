const express = require("express");
const controller = require('../controllers/auth')
const router = express.Router();

router.post("/login", controller.login);
router.post('/reg',controller.register)
router.get("/me",controller.me);
router.get("/check",controller.check)

module.exports = router;
