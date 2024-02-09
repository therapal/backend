const express = require("express");
const router = express.Router();

const {
  createTherapistReview,
  getTherapistReview,
} = require("../../controller/review.controller");

router.route("/").post(createTherapistReview).get(getTherapistReview);

module.exports = router;
