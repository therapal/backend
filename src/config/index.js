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
module.exports.serverApiDomain = process.env.serverApiDomain;
module.exports.mailTokenSecret = process.env.mailTokenSecret;
module.exports.clientDomain = process.env.clientDomain;
module.exports.paystackConfig = {
  pubKey: process.env.paystackPubKey,
  privKey: process.env.paystackPrivKey,
};

module.exports.mail = {
  host: process.env.mail_host,
  pass: process.env.mail_pass,
  service: process.env.mail_service,
  user: process.env.mail_user,
  port: process.env.mail_port,
};
