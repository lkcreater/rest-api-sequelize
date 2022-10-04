module.exports = (PostDB, sequelize, DataTypes, QueryTypes, $pagination) => {
    const Tags = {};
    const TABLE_NAME = PostDB.tableName;
    const POST_TYPE = PostDB.isType.tag;

    const $sql = (object) => {
        let select = '*';
        if(object){
            select = (object.select) ? object.select.join(', ') : '*';
        }

        return `SELECT ${select} 
                FROM ${TABLE_NAME} 
                WHERE type='${POST_TYPE}' AND published=1`;
    }

    Tags.queurySearch = async (txt) => {
        const sql = $sql({
            select: ['id', 'title']
        });

        return await sequelize.query( sql + ` AND title LIKE :txt`, { 
            replacements: { txt: `%${txt}%` },
            type: QueryTypes.SELECT 
        }); 
    }

    Tags.queuryAll = async (select) => {
        const sql = $sql({
            select: select
        });

        return await sequelize.query( sql, { 
            type: QueryTypes.SELECT 
        }); 
    }

    return Tags;
}