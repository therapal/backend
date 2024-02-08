const express = require("express");
const router = express.Router();
const { createCategory } = require("../../controller/category.controller");

router.route("/").put(createCategory);

module.exports = router;
