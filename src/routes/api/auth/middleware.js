const { ApiError } = require("@utils/errors.js");

module.exports.validateSigninCredentials = function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError("Invalid email and password combination", 400));
  }
  return next();
};
module.exports.validateSignupCredentials = function (req, res, next) {
  const { email, password, full_name } = req.body;
  if ((!email || !password, full_name)) {
    return next(new ApiError("Please complete your form to continue", 400));
  }
  const validPassword = checkPasswordStrength(password);
  if (validPassword.error) {
    return next(new ApiError(validPassword.error, 400));
  }
  return next();
};

function checkPasswordStrength(password) {
  if (password.length < 8) {
    return {
      error: "Password must be up to 8 characters long",
    };
  }
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  if (!uppercaseRegex.test(password)) {
    return {
      error: "Password must contain an uppercase character",
    };
  }
  if (!lowercaseRegex.test(password)) {
    return {
      error: "Password must contain a lowercase character",
    };
  }
  if (!numberRegex.test(password)) {
    return {
      error: "Password must contain a digit",
    };
  }
  return true;
}
