module.exports = (sequelize, Sequelize, DataTypes) => {
    const UserRole = sequelize.define(
        "user_roles", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            role_id: {
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.UUID,
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


    UserRole.assignRole = async (userId, roles) => {
        // delete all older record
        const deleteUserRole = await UserRole.destroy({
            where: { user_id: userId }
        });

        // create user roles
        let data = [];
        roles.forEach(item => {
            data.push({
                role_id: item.id,
                user_id: userId
            });
        });
        return await UserRole.bulkCreate(data);
    }
  
    return UserRole;
};
  