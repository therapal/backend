const express = require("express");
const router = express.Router();

const {
  addSpecialisation,
  getTherapistSpecialisations,
} = require("../../controller/specialisation.controller");
const { authenticateUser, validateRole } = require("../middlewares/auth");

router
  .route("/")
  .put(authenticateUser, validateRole("therapist"), addSpecialisation)
  .get(authenticateUser, validateRole("therapist", "client"), getTherapistSpecialisations);

module.exports = router;
