const config = require("../config/config.js");
const helper = require("../helpers");
const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");

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
  //res.send("connected")
})
.catch(function(error) {
  console.log("Error creating connection:", error);
  //res.send(error)
});

const db = {};

// register helper
db.$helper = helper;

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

// load all models 
db.books = require("./book.model.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes);
db.category = require("./categorys.model.js")(sequelize, Sequelize, DataTypes);
db.post = require("./post.model.js")(sequelize, Sequelize, DataTypes, QueryTypes);
db.termRelationship = require("./termRelationship.model.js")(sequelize, Sequelize, DataTypes);

// setup helper
db.HLEP = require("./render/model.helper.js")(db, QueryTypes);
// setup option
db.OPTION = require("./render/model.option.js")(db, QueryTypes);

// // join model
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "role_id",
//   otherKey: "user_id"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "user_id",
//   otherKey: "role_id"
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
