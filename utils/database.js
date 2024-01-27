const db = require('../models/index');
const logger = require('../logger');

module.exports = async function connection() {
    try {
        await db.sequelize.authenticate();
        logger.info("Database connected");
    } catch (err) {
        logger.error("Database failed to connect");
        console.error(err)
    }
}