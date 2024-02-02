const express = require("express");
const router = express.Router();
const { searchTherapist } = require("../../controller/client.controller.js");

const {
  createAppointment,
} = require("../../controller/appointment.controller.js");

const { authenticateUser } = require("../middlewares/auth");

router.route("/search").get(authenticateUser, searchTherapist);
router.route("/appointment").post(authenticateUser, createAppointment);
module.exports = router;
