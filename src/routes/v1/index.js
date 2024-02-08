const router = require("express").Router();

const authRoute = require("./auth.route");
const adminRoute = require("./admin.route");
const appointmentRoute = require("./appointment.route");
const profileRoute = require("./profile.route");
const searchRoute = require("./search.route");
const specialisationRoute = require("./specialisation.route");
const preferenceRoute = require("./preference.route");
const categoryRoute = require("./category.route");
const reviewRoute = require("./review.route");
const { authenticateUser, validateRole } = require("../middlewares/auth");

router.use("/auth", authRoute);
router.use("/admin", adminRoute);
router.use(
  "/appointment",
  authenticateUser,
  validateRole("client"),
  appointmentRoute,
);
router.use(
  "/profile",
  authenticateUser,
  validateRole("therapist"),
  profileRoute,
);
router.use("/search", authenticateUser, validateRole("client"), searchRoute);
router.use(
  "/specialisation",
  authenticateUser,
  validateRole("therapist"),
  specialisationRoute,
);
router.use(
  "/preference",
  authenticateUser,
  validateRole(["client"]),
  preferenceRoute,
);
router.use("/review", authenticateUser, validateRole("client"), reviewRoute);
router.use("/category", authenticateUser, categoryRoute);

module.exports = router;
