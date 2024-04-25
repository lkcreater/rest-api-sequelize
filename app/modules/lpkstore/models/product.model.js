module.exports = (sequelize, { DataTypes }) => {
    const Model = sequelize.define(
        `${sequelize.prenameTableModel}_products`,
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,   
                allowNull: false,             
            },
            slug: {
                type: DataTypes.STRING,        
            },
            desc: {
                type: DataTypes.TEXT,
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return Model;
};