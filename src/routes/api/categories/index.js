const { Router } = require("express");
const router = Router();
const controller = require("./controller.js");

router.post("/", controller.createCategory);
router.get("/", controller.getAllCategory);

router.get("/:id/therapist", controller.getAllTherapistsInCategory);

module.exports = router;
