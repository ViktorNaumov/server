const express = require("express");
const controller = require('../controllers/getcontr')
const router = express.Router();

router.post("/thickness", controller.thickness);
router.post("/steel", controller.steel);
router.post("/nameholder", controller.nameholder);
router.post("/order", controller.order);

module.exports = router;