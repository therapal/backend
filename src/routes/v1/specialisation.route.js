const express = require("express");
const router = express.Router();

const {
  addSpecialisation,
} = require("../../controller/specialisation.controller");

router.route("/").put(addSpecialisation);

module.exports = router;
