const router = require("express").Router();
const v1Router = require("./v1");
const { catchAsyncErrors } = require("./middlewares/errors");

router.use("/api/v1", catchAsyncErrors(v1Router));
router.get("/", (req, res) => res.status(200));

module.exports = router;
