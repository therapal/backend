require('dotenv').config()

module.exports.database = {
    database: process.env.db_name,
    username: process.env.db_user,
    password: process.env.db_password,
    dialect: 'postgres',
    port: process.env.db_port,
    host: process.env.db_host,
}