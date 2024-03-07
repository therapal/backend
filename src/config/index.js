require("dotenv").config();

module.exports.database = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
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

module.exports.treblleConfig = {
  apiKey: process.env.treblleApiKey,
  projectId: process.env.treblleProjectId,
};
