const configEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  /** DATABASE */
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
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
    secret: "our-secret-key"
  },

  /** HOST API */
  base_host_api: '' 
};

/***** local *****/
const configLocal = {
  NODE_ENV: 'development',
  PORT: '3000',

  /** DATABASE */
  db: {
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASS: '',
    DB_NAME: 'db_node_rest_api',
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
    secret: "our-secret-key"
  },

  /** HOST API */
  base_host_api: 'api' 
};

module.exports = configLocal;
