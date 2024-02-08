const express = require("express");
const router = express.Router();
const {
  createAppointment,
  verifyAppointment,
} = require("../../controller/appointment.controller.js");

router.route("/").post(createAppointment);
router.route("/verify/:trxRef").post(verifyAppointment);
module.exports = router;
