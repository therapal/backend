require("module-alias/register");
const logger = require("@logger");

// eslint-disable-next-line no-unused-vars
function globalErrors(err, req, res, next) {
  const errorStatus = err.status || 500;
  err.status = errorStatus;
  res.locals.message = err.message;

  // Check if the request was for the pages route
  if (errorStatus === 404) {
    if (req.originalUrl.startsWith("/api")) {
      return res
        .status(404)
        .json({ success: false, message: "Route Not Found" });
    } else {
      return res.sendStatus(404);
    }
  }

  if (errorStatus === 500) {
    logger.error(err, { stack: err.stack });
  }

  res.status(errorStatus).json({
    success: false,
    message:
      errorStatus === 500 ? "Something went wrong. Try again" : err.message,
  });
}
module.exports = {
  globalErrors,
};
