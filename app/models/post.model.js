module.exports = (sequelize, Sequelize, DataTypes) => {
    const Post = sequelize.define(
        "posts", // Model name
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            type: {
                type: DataTypes.ENUM({
                    values : ['POST', 'TAG', 'MEDIA']
                }),
                defaultValue: 'POST'
            },
            mime_type: {
                type: DataTypes.STRING,
            },
            title: {
                type: DataTypes.STRING,   
                allowNull: false,             
            },
            slug: {
                type: DataTypes.STRING,        
            },
            content_excerpt: {
                type: DataTypes.TEXT,
            },
            content: {
                type: DataTypes.TEXT,
            },
            options: {
                type: DataTypes.TEXT,
            },
            menu_order: {
                type: DataTypes.INTEGER,
            },
            pin_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            comment_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            public_date_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            create_by: {
                type: DataTypes.UUID,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            update_by: {
                type: DataTypes.UUID,
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

    return Post;
};