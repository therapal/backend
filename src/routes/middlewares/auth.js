const { jwtSecret } = require("../../config");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../utils/errors");

module.exports.authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  jwt.verify(token, jwtSecret, (err, info) => {
    try {
      if (err) {
        next(new ApiError("Invalid token", 400));
      } else {
        req.user = {
          id: info.id,
          role: info.role,
        };
        next();
      }
    } catch (err) {
      next(new ApiError("Invalid token", 400));
      console.error(err);
    }
  });
};
