module.exports = (sequelize, QueryTypes) => {
    return async (sql, { page, limit, search }) => {

        // ACTION COUNT SQL
        const modelsAll = await sequelize.query(sql, { 
            type: QueryTypes.SELECT,
            replacements: search
        });
        const rows = modelsAll.length;

        // ACTION QUERY SQL
        sql = sql + ` LIMIT ` + ((page - 1) * limit) + `, ` + limit
        const models = await sequelize.query(sql, { 
            type: QueryTypes.SELECT,
            replacements: search
        }); 
        const num = models.length;
        const maxPage = Math.ceil(rows/limit);

        return {
            meta:{
                maxRow: rows,
                limit,
                maxPage,
                currentPage: page,
                currentRow: num
            },
            record: models
        }
    }
}