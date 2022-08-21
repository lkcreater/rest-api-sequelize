const db = require("../models");
const { Validator } = require('node-input-validator');
const helpers = require("../helpers");
const Post = db.post;
const Op = db.Op;

//***********************************************************/
// เช็ค middle เพื่อหา post by pk ว่ามีอยู่จริงไหม 
//***********************************************************/
exports.middle = {
    // check req post by pk
    checkReqPostByPk: async (req, res, next) => {
        const post = (req.params.id) ? await Post.getFullByPk(req.params.id) : [];
        if(post.length > 0){
            req.isUpdate = {
                status : true,
                items: post[0]
            };        
        }else{
            req.isUpdate = {
                status : false,
                items: null
            };  
        }
        next();
    },

    // handle upload file
    uploadFile: (req, res, next) => {
        const fnUploadMiddle = helpers.file.upload.array('file');

        fnUploadMiddle(req, res, (err) => {
            // handle error
            if (err instanceof helpers.file.multer.MulterError) {
            // A Multer error occurred when uploading.
                console.log('error 1', err);
            } else if (err) {
                console.log('error 2', err);
            // An unknown error occurred when uploading.
            }

            let files = [];
            if(req.files){
                files = req.files.map(element => {
                    return helpers.file.getFileData(element);
                });
            }
            req.files = files;
            next();
        })
    }
}

const fnSetupCateAndTags = async (postId, attrib) => {
    // setup categories
    const cateIds = JSON.parse(attrib.selectCategory);
    if(cateIds){
        await db.HLEP.insertPostIdsToId(postId, cateIds)
    }

    // setup tags
    const tagIds = JSON.parse(attrib.tags).map((val) => {
        return val.title;
    });
    if(tagIds){
        await db.HLEP.insertTagsOfPostId(postId, tagIds)
    }

    // return respone
    return await Post.getFullByPk(postId);
}

const fnPostAction = (req, res) => {
    const { status, items } = req.isUpdate;
    let attrib = req.body;
    let result = null;        

    const v = new Validator(req.body, {
        title: 'required'
    });

    v.check().then( async (matched) => {
        if (!matched) {
            res.status(422).send({errors : v.errors});
        }else{ 
            attrib.slug = (!attrib.slug) ? helpers.text.setSlug(attrib.title) : helpers.text.setSlug(attrib.slug);

            // is new record ** action create 
            if(status === false){
                attrib.options = {
                    image: req.files
                } 

                const insertPost = await Post.create(attrib);
                if(insertPost){                    
                    result = await fnSetupCateAndTags(insertPost.id, attrib);
                }
            }

            // is update record ** action update
            if(status === true){
                if(req.files.length > 0){
                    if(attrib.options && attrib.options.image) {
                        attrib.options.image = req.files
                    } else{
                        attrib.options = {
                            image: req.files
                        } 
                    }
                }
                
                const updatePost = await Post.update(attrib, {
                    where: {id: items.id}
                });
                
                if(updatePost.length > 0){                    
                    result = await fnSetupCateAndTags(items.id, attrib);
                }
            }            

            // return result
            res.send({
                result: result
            });
        }
    });
}

//***********************************************************/
// controller create 
//***********************************************************/
exports.create = fnPostAction;

//***********************************************************/
// controller update 
//***********************************************************/
exports.update = fnPostAction;

//***********************************************************/
// controller get find all
//***********************************************************/
exports.findOne = async (req, res) => {    
    const data = await Post.getFullByPk(req.params.id);
    res.send({
        result: data
    });
};

//***********************************************************/
// controller get find all
//***********************************************************/
exports.findAll = async (req, res) => {
    let page = (req.query.page) ? req.query.page : 1;
    const data = await Post.findModelAll(page);
    
    res.send({
        result: data
    });
};

//***********************************************************/
// controller active find one
//***********************************************************/
exports.active = async (req, res) => {    
    const { id } = req.params;
    const { published } = req.body;

    Post.update({ published : published }, { where: { id: id } })
    .then((result) => {
        res.send({
            result: true
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error active with id=" + id
        });
    });     
};

//***********************************************************/
// controller delete find one
//***********************************************************/
exports.delete = async (req, res) => {    
    const { id } = req.params;

    Post.update({ published : Post.isPublished.delete }, { where: { id: id } })
    .then((result) => {
        res.send({
            result: true
        });
    }).catch(err => {
        res.status(500).send({
            message: "Error delete with id=" + id
        });
    });     
};