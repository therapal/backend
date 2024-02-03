require("dotenv").config();

module.exports.database = {
  database: process.env.db_name,
  username: process.env.db_user,
  password: process.env.db_password,
  dialect: "postgres",
  port: process.env.db_port,
  host: process.env.db_host,
};

module.exports.redisConfig = {
  host: process.env.redis_host,
  port: process.env.redis_port,
};

module.exports.sessionSecret = process.env.sessionSecret;
module.exports.jwtSecret = process.env.jwtSecret;
module.exports.cookieSecret = process.env.cookieSecret;
module.exports.NODE_ENV = process.env.NODE_ENV;
module.exports.paystackConfig = {
  pubKey: process.env.paystackPubKey,
  privKey: process.env.paystackPrivKey,
};
