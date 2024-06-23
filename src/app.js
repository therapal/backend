const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

const { COOKIE_SECRET } = require("./config");
const httpLogger = require("./app-middlewares/http-logger.js");
const corsConfig = require("./app-middlewares/cors.js");
const { globalErrors } = require("./app-middlewares/error.js");

const apiRoute = require("./routes/api/index.js");
const cspHeaders = require("./app-middlewares/csp.js");

const app = express();
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Powered-By", "Therapal");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
app.use(cspHeaders());

app.disable("X-Powered-By");
app.use(cookieParser(COOKIE_SECRET));
app.use(httpLogger());
app.use(corsConfig());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
// eslint-disable-next-line no-undef
app.use("/api", apiRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(globalErrors);

module.exports = app;
