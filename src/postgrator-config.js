

require('dotenv').config();

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "host": process.env.MIGRATION_DB_HOST,
    "port": process.env.MIGRATION_DB_PORT,
    "database": process.env.MIGRATION_DATABASE_NAME,
    "username": process.env.MIGRATION_DATABASE_USER,
    "password": process.env.MIGRATION_DB_PASS,
    "validateChecksums": false,
    "ssl": false
}