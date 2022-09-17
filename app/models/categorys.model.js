module.exports = (sequelize, Sequelize, DataTypes, $pagination) => {
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

    Categorys.queryAll = async (page= 1, limit= 10, search={}) => {
        // set sql
        let sql = `SELECT * FROM categorys WHERE published=1 `;

        // set filter
        const filter = {}
        if(search.title){
            sql = sql + ` AND title LIKE :title `;
            filter.title = `%${search.title}%`;
        }  

        return $pagination(sql, {
            page: page,
            limit: limit,
            search: filter
        })
    }

    return Categorys;
};