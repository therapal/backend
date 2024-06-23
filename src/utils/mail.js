const nodemailer = require("nodemailer");
const {
  MAIL_CONFIG,
  NO_REPLY_MAIL_CONFIG,
  NODE_ENV,
} = require("@config/index.js");
const logger = require("@logger/index.js");

async function sendEmail(options, sender, callback) {
  let SENDER;
  if (sender === "noreply") {
    SENDER = NO_REPLY_MAIL_CONFIG;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_CONFIG.host,
      port: MAIL_CONFIG.port,
      secure: NODE_ENV !== "development",
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
      connectionTimeout: 60000,
      auth: {
        user: SENDER.user,
        pass: SENDER.pass,
      },
    });
    const mailOptions = {
      from: `"Therapal" <${SENDER.user}>`,
      to: options.receiver,
      subject: options.subject,
      html: options.html,
    };
    await transporter.sendMail(mailOptions).then(() => callback && callback());
  } catch (err) {
    logger.error(err);
  }
}

module.exports = { sendEmail };
