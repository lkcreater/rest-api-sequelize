module.exports = (sequelize, Sequelize, DataTypes, QueryTypes) => {
        
    return {
        $pagination: require('./pagination')(sequelize, QueryTypes)
    };
}