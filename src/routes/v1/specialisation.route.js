const express = require("express");
const router = express.Router();

const {
  addSpecialisation,
  getUserSpecialisations,
} = require("../../controller/specialisation.controller");
const { authenticateUser, validateRole } = require("../middlewares/auth");

router
  .route("/")
  .put(authenticateUser, validateRole("therapist"), addSpecialisation)
  .get(getUserSpecialisations);

module.exports = router;
