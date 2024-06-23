const { Router } = require("express");
const router = Router();

const appointmentRoute = require("./appointment/index.js");
const specialisationRoute = require("./specialisation/index.js");
const categoryRoute = require("./categories/index.js");

router.use("/appointments", appointmentRoute);
router.use("/specialisation", specialisationRoute);
router.use("/category", categoryRoute);

module.exports = router;
