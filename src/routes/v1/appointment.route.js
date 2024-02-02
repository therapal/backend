const express = require("express");
const router = express.Router();
const {
  createAppointment,
  editAppointment,
} = require("../../controller/appointment.controller.js");
const { authenticateUser } = require("../middlewares/auth");

router.route("/").post(authenticateUser, createAppointment);
router.route("/:id").post(authenticateUser, editAppointment);
module.exports = router;
