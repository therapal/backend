const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  getAllUsersInCategory,
} = require("../../controller/category.controller");
const { authenticateUser, validateRole } = require("../middlewares/auth");

router
  .route("/")
  .post(authenticateUser, validateRole("admin"), createCategory)
  .get(getAllCategory);

router.route("/:id/user").get(getAllUsersInCategory);

module.exports = router;
