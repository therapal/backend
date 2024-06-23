const helmet = require("helmet");
const { NODE_ENV } = require("../config");

function csp() {
  const scriptSrc = ["'self'"];

  if (NODE_ENV === "development") {
    scriptSrc.push("'unsafe-eval'");
  }

  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ["'self'"],
        styleSrc: ["'self'"],
        scriptSrc: scriptSrc,
        imgSrc: ["'self'"],
      },
    },
    frameguard: {
      action: "deny",
    },
    noSniff: true,
  });
}

module.exports = csp;
