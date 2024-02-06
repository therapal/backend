const { jwtSecret } = require("../../config");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../utils/errors");

module.exports.authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  jwt.verify(token, jwtSecret, (err, info) => {
    try {
      if (err) {
        return next(new ApiError("Invalid token", 400));
      } else {
        if (!info.isEmailVerified) {
          return next(new ApiError("Account is not yet verified", 401));
        }
        req.user = {
          id: info.id,
          role: info.role,
        };
        next();
      }
    } catch (err) {
      console.error(err);
      return next(new ApiError("Invalid token", 400));
    }
  });
};
module.exports.validateRole = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.include(userRole)) {
      return next(new ApiError("You can't access this route", 401));
    }
    next();
  };
};
