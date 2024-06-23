const { DATABASE } = require("./index.js");
module.exports = {
  development: {
    ...DATABASE,
  },
  test: {
    ...DATABASE,
  },
  production: {
    ...DATABASE,
  },
};
