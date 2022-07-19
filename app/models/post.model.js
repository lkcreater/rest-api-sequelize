module.exports = (sequelize, Sequelize, DataTypes) => {
    const enumValue = {
        post:   'POST', 
        tag:    'TAG',
        media:  'MEDIA'
    };

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
                    values : Object.values(enumValue)
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
                get(){
                    const storedValue = this.getDataValue('options');
                    return JSON.parse(storedValue);
                },
                set(value){
                    this.setDataValue('options', JSON.stringify(value));
                }
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

    Post.isType = enumValue;

    return Post;
};