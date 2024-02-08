const { database } = require("../src/config");
module.exports = {
  development: {
    ...database,
  },
  test: {
    ...database,
  },
  production: {
    ...database,
  },
};
