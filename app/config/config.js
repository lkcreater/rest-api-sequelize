//require('dotenv').config();
const local = require("./local");

const configEnv = {
    NODE_ENV: process.env.NODE_ENV || local.NODE_ENV,
    PORT: process.env.PORT || local.PORT,

    /** DATABASE */
    db: {
        DB_HOST: process.env.DB_HOST || local.db.DB_HOST,
        DB_USER: process.env.DB_USER || local.db.DB_USER,
        DB_PASS: process.env.DB_PASS || local.db.DB_PASS,
        DB_NAME: process.env.DB_NAME || local.db.DB_NAME,
        DB_PORT: process.env.DB_PORT || local.db.DB_PORT,
        dialect: "mysql",

        // pool is optional, it will be used for Sequelize connection pool configuration
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },

    /** AUTH KEY */
    auth: {
        headerKeyToken: "x-access-token",
        secret: "our-secret-key",
        expiresIn: 3600 //86400 // 24 hr
    },

    /** HOST API */
    base_host_api: 'api',
    NAME_SLUG_API: 'api',
};

module.exports = configEnv;
