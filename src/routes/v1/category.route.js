const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  getAllTherapistsInCategory,
} = require("../../controller/category.controller");
const { authenticateUser, validateRole } = require("../middlewares/auth");

router
  .route("/")
  .post(authenticateUser, validateRole("admin"), createCategory)
  .get(getAllCategory);

router
  .route("/:id/therapist")
  .get(
    authenticateUser,
    validateRole("therapist", "client"),
    getAllTherapistsInCategory,
  );

module.exports = router;
