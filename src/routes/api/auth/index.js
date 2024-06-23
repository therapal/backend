const { Router } = require("express");
const router = Router();
const controller = require("./controller.js");
const {
  validateSigninCredentials,
  validateSignupCredentials,
} = require("./middleware.js");
const { catchAsyncErrors } = require("@utils/errors.js");
const { authLimiter } = require("../middleware.js");

router.use("*", authLimiter);

router.post(
  "/signin/therapist",
  validateSigninCredentials,
  catchAsyncErrors(controller.signinTherapist)
);

router.post(
  "/signin/client",
  validateSigninCredentials,
  catchAsyncErrors(controller.signinClient)
);

router.post(
  "/signup/therapist",
  validateSignupCredentials,
  catchAsyncErrors(controller.signupTherapist)
);

router.post(
  "/signup/client",
  validateSignupCredentials,
  catchAsyncErrors(controller.signupClient)
);
