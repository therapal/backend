const { Therapists, Clients } = require("@models/index.js");
const { THERAPIST_JWT_SECRET, CLIENT_JWT_SECRET } = require("@config/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signinTherapist = async function (req, res, next) {
  const { email, password } = req.body;
  const user = await Therapists.findOne({
    where: { email },
    attributes: ["id", "password", "account_status", "verified_email"],
  });
  if (user.account_status !== "active") {
    return next(new ApiError("This account has been blocked", 403));
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return next(new ApiError("Incorrect credentials", 401));
  }
  if (!user.verified_email) {
    return next(new ApiError("Email must be verified to continue", 403));
  }
  const token = jwt.sign(
    { role: "therapist", user_id: user.id },
    THERAPIST_JWT_SECRET,
    "60 mins"
  );
  res.status(200).json({
    success: true,
    message: "Currently signed in as therapist",
    data: {
      token,
    },
  });
};

module.exports.signupTherapist = async function (req, res, next) {
  const { email, password, full_name } = req.body;

  // Check if email is already registered
  const count = await Therapists.count({
    where: { email },
    attributes: ["email"],
  });
  if (count > 0) {
    return next(new ApiError("This email is registered", 409));
  }

  const hashedPassword = bcrypt.hash(password, 10);

  await Therapists.create({
    email,
    full_name,
    password: hashedPassword,
    verified_email: false,
  });

  res.status(201).json({
    success: true,
    message: "Account creation successful",
  });
};

module.exports.signupClient = async function (req, res, next) {
  const { email, password, full_name } = req.body;

  // Check if email is already registered
  const count = await Clients.count({
    where: { email },
    attributes: ["email"],
  });
  if (count > 0) {
    return next(new ApiError("This email is registered", 409));
  }

  const hashedPassword = bcrypt.hash(password, 10);

  await Clients.create({
    email,
    full_name,
    password: hashedPassword,
    verified_email: false,
  });

  res.status(201).json({
    success: true,
    message: "Account creation successful",
  });
};

module.exports.signinClient = async function (req, res, next) {
  const { email, password } = req.body;
  const user = await Clients.findOne({
    where: { email },
    attributes: ["id", "password", "account_status", "verified_email"],
  });
  if (user.account_status !== "active") {
    return next(new ApiError("This account has been blocked", 403));
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return next(new ApiError("Incorrect credentials", 401));
  }
  if (!user.verified_email) {
    return next(new ApiError("Email must be verified to continue", 403));
  }
  const token = jwt.sign(
    { role: "client", user_id: user.id },
    CLIENT_JWT_SECRET,
    "60 mins"
  );
  res.status(200).json({
    success: true,
    message: "Currently signed in as client",
    data: {
      token,
    },
  });
};
