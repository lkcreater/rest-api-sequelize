module.exports = (sequelize, Sequelize, DataTypes) => {
    const Categorys = sequelize.define(
        "categorys", // Model name
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            parent_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            title: {
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

    Categorys.prototype.testMethod = function () {
        console.log(this);
      };

    return Categorys;
};