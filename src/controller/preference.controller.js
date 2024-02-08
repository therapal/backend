const { catchAsyncErrors } = require("../routes/middlewares/errors");
module.exports.updatePreference = catchAsyncErrors(
  async (req, res, next) => {},
);
