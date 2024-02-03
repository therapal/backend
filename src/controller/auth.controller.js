const ApiError = require("../utils/errors");
const {
  client: Client,
  therapist: Therapist,
  admin: Admin,
} = require("../models");
const { jwtSecret, NODE_ENV } = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("../routes/middlewares/errors");

module.exports.register = catchAsyncErrors(async function (req, res, next) {
  const { email, fullName, password, role } = req.body;
  if (!email || !fullName || !password) {
    return next(new ApiError("Invalid request body", 400));
  }
  if (!["therapist", "client", "admin"].includes(role)) {
    return next(new ApiError("Invalid role", 400));
  }
  const hashedPassword = await generatePasswordHash(password);
  const user = {
    email,
    fullName,
    isVerified: false,
    password: hashedPassword,
  };

  switch (role) {
    case "therapist":
      await Therapist.create(user);
      return;
    case "client":
      await Client.create(user);
      return;
    case "admin":
      await Admin.create(user);
  }
  res.status(201).json({
    success: true,
    message: "User registered",
  });
});

module.exports.sendVerificationEmail = catchAsyncErrors(
  async function (req, res, next) {},
);
module.exports.login = catchAsyncErrors(async function (req, res, next) {
  const { email, password, role } = req.body;
  let user;
  switch (role) {
    case "therapist":
      user = await Therapist.findOne({
        where: { email },
        attributes: ["password", "isVerified"],
      });
      user.role = "therapist";
      return;
    case "client":
      user = await Client.findOne({
        where: { email },
        attributes: ["password", "isVerified"],
      });
      user.role = "client";
      return;
    default:
      if (!user) {
        return next(new ApiError("Incorrect credentials", 400));
      }
  }
  if (!user.isVerified) {
    return next(new ApiError("Account is not yet verified", 401));
  }
  const compare = bcrypt.compareSync(password, user.password);
  if (!compare) {
    return next(new ApiError("Incorrect credentials", 400));
  }

  const token = await createJwtToken({
    id: user.id,
    role: user.role,
    isVerified: user.isVerified,
  });
  res.cookie("token", token, {
    signed: true,
    path: "/",
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: NODE_ENV !== "development",
  });
  res.status(200).json({
    success: true,
    message: "You are now logged in",
  });
});

async function createJwtToken(user) {
  const maxAge = "30 mins";
  return await jwt.sign(
    {
      id: user.id,
      role: user.role,
      isVerified: user.isVerified,
    },
    jwtSecret,
    { expiresIn: maxAge },
  );
}

async function generatePasswordHash(password) {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
}
