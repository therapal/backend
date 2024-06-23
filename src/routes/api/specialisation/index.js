const {Router} = require("express");
const router = Router();

const controller = require("./controller.js")

router.put("/", controller.addSpecialisation)
router.get("/", controller.getTherapistSpecialisations)

module.exports = router;
