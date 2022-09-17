module.exports = (sequelize, Sequelize, DataTypes, QueryTypes, $pagination) => {
    const enumValue = {
        post:   'POST', 
        tag:    'TAG',
        media:  'MEDIA'
    };

    const typePublic = {
        deactive: 0,
        active: 1,
        delete: 99
    }

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
                get(){
                    return unescape(this.getDataValue('content'));
                },
                set(value){
                    this.setDataValue('content', escape(value));
                }
            },
            options: {
                type: DataTypes.TEXT,
                get(){
                    const storedValue = this.getDataValue('options');
                    if(storedValue){
                        return JSON.parse(storedValue);
                    }
                    return storedValue;
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

    Post.isPublished = typePublic;

    Post.sql = {
        selectFull: `SELECT
                p.*,
                JSON_EXTRACT(p.options, '$') AS options,
                (   SELECT JSON_ARRAYAGG(JSON_OBJECT( 'cate_id', c.id, 'cate_title', c.title)) 
                    FROM categorys c 
                    LEFT JOIN term_relationships tr 
                    ON c.id = tr.term_id 
                    WHERE tr.term_type='CATEGORY' AND tr.post_id=p.id AND c.published=1
                ) AS  categorys,
                (   SELECT JSON_ARRAYAGG(JSON_OBJECT( 'tag_id', t.id , 'tag_title', t.title, 'tag_url', CONCAT('api/tag/', t.id))) 
                    FROM posts t 
                    LEFT JOIN term_relationships tr2 
                    ON t.id = tr2.term_id 
                    WHERE tr2.term_type ='POST' AND tr2.post_id=p.id AND t.published=1
                ) AS  tags
            FROM posts p 
            WHERE p.type='POST' AND p.published IN(0, 1) `,

        select: `SELECT`,

        selector: [
            `p.*`,
            `JSON_EXTRACT(p.options, '$') AS options`,
            `( SELECT JSON_ARRAYAGG(JSON_OBJECT( 'cate_id', c.id, 'cate_title', c.title)) 
                FROM categorys c 
                LEFT JOIN term_relationships tr 
                ON c.id = tr.term_id 
                WHERE tr.term_type='CATEGORY' AND tr.post_id=p.id AND c.published=1
            ) AS categorys`,
            `( SELECT JSON_ARRAYAGG(JSON_OBJECT( 'tag_id', t.id , 'tag_title', t.title, 'tag_url', CONCAT('api/tag/', t.id))) 
                FROM posts t 
                LEFT JOIN term_relationships tr2 
                ON t.id = tr2.term_id 
                WHERE tr2.term_type ='POST' AND tr2.post_id=p.id AND t.published=1
            ) AS tags`
        ],

        form: [
            `FROM posts p`
        ],

        where: [
            `WHERE p.type='POST'`,            
        ],

        convertSql: () => {
            const { select, selector, form, where } = Post.sql;
            const sql = `${select} ${selector.join(', ')} ${form} ${where}`
            console.log(sql);
        },

        countFull: `SELECT COUNT(*) AS rows FROM posts WHERE type='POST' AND published=1`,

    }

    Post.getFullByPk = async (id) => {
        return await sequelize.query(Post.sql.selectFull + `AND p.id=:id`, { 
            replacements: { id: id },
            type: QueryTypes.SELECT 
        });        
    }

    Post.findModelAll = async (page= 1, limit= 10) => {
        return $pagination(Post.sql.selectFull, {
            page: page,
            limit: limit
        })
    }

    return Post;
};