const config = require("../config/config");

module.exports = (Sequelize) => {
    const sequelize = new Sequelize(
        config.db.DB_NAME,
        config.db.DB_USER,
        config.db.DB_PASS,
        {
            host: config.db.DB_HOST,
            dialect: config.db.dialect,
            port: config.db.DB_PORT,
            operatorsAliases: false,
    
            poll: {
                max: config.db.pool.max,
                min: config.db.pool.min,
                acquire: config.db.pool.acquire,
                idle: config.db.pool.idle
            }
        }
    );
    
    sequelize.authenticate().then(function () {
        console.log('Connection successful');
    })
    .catch(function(error) {
        console.log("Error creating connection:", error);
    });

    return sequelize;
};