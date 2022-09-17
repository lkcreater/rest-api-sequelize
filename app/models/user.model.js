
module.exports = (sequelize, Sequelize, DataTypes, QueryTypes, $pagination) => {
    const User = sequelize.define(
        "users", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.INTEGER(2),
                defaultValue: 1
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

    const sqlquery = `
                    SELECT *,
                        JSON_EXTRACT(t2.image, '$') AS image,
                        (   
                            SELECT JSON_ARRAYAGG( JSON_OBJECT( 
                                'id', r.id, 
                                'name', r.name, 
                                'items', JSON_EXTRACT(r.items, '$'),
                                'is_admin', r.is_admin
                            ) ) 
                            FROM user_roles ur 
                            LEFT JOIN roles r 
                            ON ur.role_id = r.id
                            WHERE ur.user_id = t1.id
                        ) AS roles
                    FROM users t1 
                    LEFT JOIN profiles t2 ON t1.id=t2.user_id
                    `;

    User.one = async (userId, isHideSecurity=true) => {
        const query =  await sequelize.query(sqlquery + ` WHERE t1.status=1 AND t1.id='${userId}' LIMIT 1`, { type: QueryTypes.SELECT }); 
        let model = {}
        if(query.length > 0){
            model = query[0];
            if(isHideSecurity){
                delete model.id;
                delete model.password;
                delete model.user_id;
            }
        }
        return model;
    }

    User.listAll = async (page=1, limit=10) => {
        return $pagination(sqlquery, {
            page: page,
            limit: limit
        })
    }
  
    return User;
  };