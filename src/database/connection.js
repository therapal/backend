const logger = require("../logger/index.js");
const { sequelize } = require("./models/index.js");

async function connect() {
  try {
    await sequelize.authenticate();
    logger.info("db connected");
  } catch (err) {
    logger.error(err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}
module.exports = connect;
