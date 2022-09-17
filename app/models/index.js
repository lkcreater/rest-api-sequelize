const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");

// connect database
const sequelize = require('./connect.db.models')(Sequelize);

// load component model
const { $pagination } = require('./component.models/model')(sequelize, Sequelize, DataTypes, QueryTypes);

// setup constrant db
const db = {
    $helper: require("../helpers"),
    Sequelize: Sequelize,
    Op: Op,
    sequelize: sequelize
};

// load all models 
db.books = require("./book.model.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes, QueryTypes, $pagination);
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes);
db.category = require("./categorys.model.js")(sequelize, Sequelize, DataTypes, $pagination);
db.post = require("./post.model.js")(sequelize, Sequelize, DataTypes, QueryTypes, $pagination);
db.userRole = require("./userRole.model.js")(sequelize, Sequelize, DataTypes, QueryTypes);
db.termRelationship = require("./termRelationship.model.js")(sequelize, Sequelize, DataTypes);
db.profile = require("./profile.model.js")(sequelize, Sequelize, DataTypes);

// setup helper
db.HLEP = require("./helper.models/model.helper.js")(db, QueryTypes);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
