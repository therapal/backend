require("dotenv").config();

module.exports.DATABASE = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4_unicode_ci",
  },
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
};

module.exports.SESSION_SECRET = process.env.SESSION_SECRET;
module.exports.COOKIE_SECRET = process.env.COOKIE_SECRET;
module.exports.NODE_ENV = process.env.NODE_ENV;

module.exports.PAYSTACK = {
  pubKey: process.env.PAYSTACK_PUBLIC_KEY,
  privKey: process.env.PAYSTACK_PRIVATE_KEY,
};

module.exports.NO_REPLY_MAIL_CONFIG = {
  user: process.env.NO_REPLY_MAIL_USER,
  pass: process.env.NO_REPLY_MAIL_PASS,
};

module.exports.MAIL_CONFIG = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  service: process.env.MAIL_SERVICE,
};
