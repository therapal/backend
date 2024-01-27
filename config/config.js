require("dotenv").config();
const {database} = require('.');

module.exports = {
  development: {
    ...database
  },
  test: {
    ...database
  },
  production: {
    ...database
  },
};
