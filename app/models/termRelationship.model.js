module.exports = (sequelize, Sequelize, DataTypes) => {
    const termRelationship = sequelize.define(
        "term_relationship", // Model name
        {
            object_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            term_type: {
                type: DataTypes.ENUM({
                    values : ['POST', 'CATEGORY']
                }),
                defaultValue: 'POST'
            },
            post_id:{
                type: DataTypes.INTEGER,
                allowNull: false, 
            },
            term_id: {
                type: DataTypes.INTEGER,
                allowNull: false, 
            }   
        },
    );

    return termRelationship;
};