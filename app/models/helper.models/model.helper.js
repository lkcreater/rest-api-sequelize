module.exports = (db, QueryTypes) => {
    const { sequelize, Op, $helper, termRelationship, post} = db;
    const help = {};

    //====================================================================/
    // insert multiple cateIds or postIds to postId
    //====================================================================/
    help.insertPostIdsToId = async (postId, postIds = [], termType = 'cate') => {
        if(postIds.length > 0){
            // set term type
            const isType = termRelationship.enumType[termType];

            // delete all older record
            const delOlder = await termRelationship.destroy({
                where: {
                    term_type: isType,
                    post_id: postId
                }
            });

            // create multiple record
            let datas = [];
            postIds.forEach((val) => {
                let object = {
                    term_type: isType,
                    post_id: postId,
                    term_id: val
                }

                datas = [...datas, object];
            });

            // return result
            return await termRelationship.bulkCreate(datas);
        }
        return null
    };

    /====================================================================/
    // insert multiple Tags to postId
    //====================================================================/
    help.insertTagsOfPostId = async (postId, strTags=[]) => {
        if(strTags.length > 0){
            let tagIds = [];
            // convert array to string regexp
            let convertArrToStrRegexp = strTags.map((str) => {
                return '^'+ str + '$';
            }).join('|');

            // query select by regexp
            const Post = await post.findAll({
                where: {
                    type: post.isType.tag,
                    title: {
                        [Op.regexp]: convertArrToStrRegexp
                    },
                    published: true
                }
            });

            // remove tag in {strTags}
            if(Post.length > 0){
                Post.forEach((p) => {
                    tagIds = [...tagIds, p.id];
                    let index = strTags.indexOf(p.title);
                    if (index > -1) {
                        strTags.splice(index, 1);
                    }
                });                
            }

            if(strTags.length > 0){
                let createObjectTags = [];
                strTags.forEach((str) => {
                    let newTag = {
                        title: str,
                        type: post.isType.tag,
                        published: true,
                        public_date_at: $helper.date.now()
                    };

                    createObjectTags = [...createObjectTags, newTag];
                });
                
                // create tags
                const insertTags = await post.bulkCreate(createObjectTags);
                insertTags.forEach((p) => {
                    tagIds = [...tagIds, p.id];
                });                
            }

            //insert postIds to {termRelationship}
            return await help.insertPostIdsToId(postId, tagIds, 'post');
        }
        return false;
    };
    

    //====================================================================/
    // insert multiple cateIds to postId
    //====================================================================/
    help.select = async () => {
        //const tern = db.termRelationship;
        // const sql = '';
        // const results = await sequelize.query(sql, {
        //     //logging: console.log,
        //     type: QueryTypes.SELECT
        // });

        console.log('result', db.termRelationship);
        
        return false;
    };

    return help;
}