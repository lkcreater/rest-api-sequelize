const _ = require('lodash');
const moment = require('moment');

module.exports = (PostDB, Op, sequelize, DataTypes, QueryTypes, $pagination) => {
    const termRelationship = sequelize.define(
        "term_relationship", // Model name
        {
            object_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            term_type: {
                type: DataTypes.ENUM({
                    values : ['POST', 'CATEGORY']
                }),
                defaultValue: 'POST'
            },
            post_id:{
                type: DataTypes.INTEGER,
                allowNull: false, 
            },
            term_id: {
                type: DataTypes.INTEGER,
                allowNull: false, 
            }   
        },
    );

    const TABLE_NAME_POST = PostDB.tableName;

    termRelationship.enumType = {
        post: 'POST',
        cate: 'CATEGORY'
    }

    termRelationship.removeAndCreateByPostPK = async (postId, arrIds, OpType) => {
        try {        
            // remove all by post id
            await termRelationship.destroy({
                where: {
                    term_type: OpType,
                    post_id: postId
                }
            })

            // setup attrib records
            const records = _.map(arrIds, id => {
                return {
                    term_type: OpType,
                    post_id: postId,
                    term_id: id
                }
            });

            // insert multi records
            return await termRelationship.bulkCreate(records);
        } catch (error) {
            throw `Error function(removeAndCreateByPostPK) : ${error}`;    
        }
    }

    //-- Relation Category
    termRelationship.relatCategorie = async (postId, cateIds) => {
        return await termRelationship.removeAndCreateByPostPK(postId, cateIds, termRelationship.enumType.cate)
    }

    //-- Relation Tags
    termRelationship.relatTags = async (postId, tags) => {
        // setup tag regexp
        const tagsRegExp = tags.map( tag => '^'+ tag + '$').join('|');

        // search old tag
        const query = await PostDB.findAll({
            attributes: ['id', 'title'],
            where: {
                type: PostDB.isType.tag, 
                published: true,
                title: { [Op.regexp]: tagsRegExp }                
            }
        });
        
        // setup var tag
        let arr_tag_ids = [];
        let arr_id_insert = [];
        const arr_ids = (query) ? _.map(query, 'id') : [];
        const arr_titles = (query) ? _.map(query, 'title') : [];

        // remove tag duplicates
        arr_new_tag = _.remove(tags, function(tag) {
            return !arr_titles.includes(tag);
        });

        // insert new tags
        if(arr_new_tag.length > 0){
            const attribNewRecords = _.map(arr_new_tag, function(tagName){
                return {
                    title: tagName,
                    type: PostDB.isType.tag,
                    published: true,
                    public_date_at: moment()
                }
            });

            const resInsert = await PostDB.bulkCreate(attribNewRecords);
            arr_id_insert = _.map(resInsert, 'id');
        }

        // merge id new tag and old tag
        arr_tag_ids = [ ...arr_ids, ...arr_id_insert ];

        return await termRelationship.removeAndCreateByPostPK(postId, arr_tag_ids, termRelationship.enumType.post)
    }

    return termRelationship;
};