const cors = require("cors");
const { ALLOWED_ORIGINS } = require("../config");

function corsConfig() {
  return cors({
    origins: ALLOWED_ORIGINS.split(", "),
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
  });
}

module.exports = corsConfig;
