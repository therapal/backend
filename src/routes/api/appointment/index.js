const { Router } = require("express");
const router = Router();
const controller = require("./controller.js");

router.post("/", controller.createAppointment);

module.exports = router;
