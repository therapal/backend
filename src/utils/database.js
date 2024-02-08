const db = require("../models/index");
const logger = require("../logger");
const redisClient = require("redis");
const { redisConfig } = require("../config");

module.exports.connectPostgres = async function () {
  try {
    await db.sequelize.authenticate();
    logger.info("connected to postgres");
  } catch (err) {
    logger.error("postgres failed to connect");
    console.error(err);
  }
};
module.exports.connectRedis = async function () {
  try {
    const client = redisClient.createClient({
      host: redisConfig.host,
      port: redisConfig.port,
    });

    client.on("error", (err) => {
      console.error("Could not connect redis client: ", err);
    });
    client.on("connect", (info) => {
      console.log("redis client connected: ", info);
    });
    return client;
  } catch (err) {
    logger.error("redis failed to connect");
    console.error(err);
  }
};
