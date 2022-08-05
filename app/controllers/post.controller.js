const db = require("../models");
const { Validator } = require('node-input-validator');
const helpers = require("../helpers");
const Post = db.post;
const Op = db.Op;

//***********************************************************/
// controller create 
//***********************************************************/
exports.create = async (req, res) => {      
    // multer set array FormData
    const upload = helpers.file.upload.array('file');
    // upload file
    upload(req, res, function (err) {
        //setup file upload
        let files = [];
        if(req.files){
            files = req.files.map(element => {
                return helpers.file.getFileData(element);
            });
        }        
        // handle error
        if (err instanceof helpers.file.multer.MulterError) {
          // A Multer error occurred when uploading.
            console.log('error 1', err);
        } else if (err) {
            console.log('error 2', err);
          // An unknown error occurred when uploading.
        }

        // use Validator
        const v = new Validator(req.body, {
            title: 'required'
        });    
        // check validate
        v.check().then( async (matched) => {
            if (!matched) {
                res.status(422).send({errors : v.errors});
            }else{
                // set attrib
                let attrib = req.body;

                // set options                
                attrib.options = {
                    image: files
                }                

                attrib.slug = (!attrib.slug) ? helpers.text.setSlug(attrib.title) : helpers.text.setSlug(attrib.slug);

                let result = null;
                const insertPost = await Post.create(attrib);
                if(insertPost){
                    const cateIds = JSON.parse(attrib.selectCategory);
                    if(cateIds){
                        await db.HLEP.insertPostIdsToId(insertPost.id, cateIds)
                    }

                    const tagIds = JSON.parse(attrib.tags).map((val) => {
                        return val.title;
                    });
                    if(tagIds){
                        await db.HLEP.insertTagsOfPostId(insertPost.id, tagIds)
                    }

                    result = await Post.getFullByPk(insertPost.id);
                }
                // console.log(files);
                // console.log(req.body);
                // console.log(insertPost);
                // Everything went fine.

                res.send({
                    result: result
                });
            }
        })
    });

};

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