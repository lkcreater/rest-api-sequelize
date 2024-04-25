const { sequelize, Sequelize, DataTypes, Op, QueryTypes } = require('../../../models');
const config = require('../config.js');

module.exports = () => {
    sequelize.prenameTableModel = config.prefixTableModel;

    const db = {};
    db.store = require('./product.model')(sequelize, {
        DataTypes
    });

    return db;
}