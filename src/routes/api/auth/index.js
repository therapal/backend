const { Router } = require("express");
const router = Router();
const controller = require("./controller.js");

router.post("/signin/customer", controller.signinTherapist);
