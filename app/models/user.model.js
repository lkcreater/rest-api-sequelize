const db = require("../models");
const Profile = db.profile;
const UserRole = db.userRole;

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
            token: {
                type: DataTypes.TEXT
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

    const SQL_CODE_TEXT = `
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
    
    User.setLastToken = async (userId, token) => {
        return await User.update({ token: token }, {
            where: {
                id: userId
            }
        })
    }

    //-- QUERY ONE BY USERNAME
    User.queryByUsername = async (username) => {
        return await User.findOne({ 
            where: { 
                username: username,
                status: 1
            } 
        });         
    }

    //-- QUERY ONE BY USERNAME OR EMAIL
    User.queryUsernameOrEmail = async (conditionObject) => {
        const condition = {
            status: 1,
            ...conditionObject
        }
        return await User.findOne({ 
            where: condition 
        });         
    }

    //-- QUERY ONE FULL DATA BY ID 
    User.queryByPk = async (userId, isHideSecurity=true) => {
        let model = null;
        const query =  await sequelize.query(`${SQL_CODE_TEXT} WHERE t1.status=1 AND t1.id=:ID LIMIT 1`, { 
            replacements: { ID: userId },
            type: QueryTypes.SELECT 
        }); 
        
        if(query.length > 0){
            model = query[0];
            if(isHideSecurity){
                delete model.id;
                delete model.password;
                delete model.user_id;
                delete model.token;
            }
        }

        return model;
    }

    //-- QUERY ONE FULL LIST
    User.queryFullList = async (page=1, limit=10) => {
        return $pagination(SQL_CODE_TEXT, {
            page: page,
            limit: limit
        })
    }

    //-- DESTROY ALL RELAT USER BY PK
    User.queryDelAllByPk = async (userId) => {
        try {
            const Del_UserRole = await UserRole.destroy({where: { user_id: userId }});
            console.log('USER ROLE : ', Del_UserRole);        
            const Del_Profile = await Profile.destroy({where: { user_id: userId }});
            console.log('USER PROFILE : ', Del_Profile);
            const Del_User = await User.destroy({where: { id: userId }});  
            console.log('USER MODEL : ', Del_User);  
            
            return (Del_UserRole && Del_Profile && Del_User) ? true : false;    
        } catch (error) {
            console.log('USER DESTROY ERROR : ', error);        
            return false   
        }        
    }
  
    return User;
  };