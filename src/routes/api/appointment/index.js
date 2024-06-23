const {Router} = require("express");
const router = Router();
const controller = require("./controller.js")

router.post("/", controller.createAppointment)
router.post("/verify/:trxRef", controller.verifyAppointment);

module.exports = router;
