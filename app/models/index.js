const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");
const { Pagination } = require('../plugins')

// connect database
const sequelize = require('./connection')(Sequelize);

// load component model
const $pagination = Pagination(sequelize, QueryTypes);

// setup constrant db
const db = {
    DataTypes,
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
db.termRelationship = require("./termRelationship.model.js")(db.post, Op, sequelize, Sequelize, DataTypes, QueryTypes, $pagination);
db.profile = require("./profile.model.js")(sequelize, Sequelize, DataTypes);
db.tag = require("./tag.model.js")(db.post, sequelize, DataTypes, QueryTypes, $pagination);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
