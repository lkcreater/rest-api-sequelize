const db = require("../models");
const { TextSlugFnc, Respone } = require("../plugins");
const TernRelat = db.termRelationship;
const Post = db.post;
const Op = db.Op;

//--------------------------------
// -- SETUP ATTRIBUTES
//--------------------------------
const setupAttributes = (params) => {
    const attributes = {
        title: params.title,
        slug: params.slug,
        public_date_at: params.public_date_at,
        content: params.content,
        content_excerpt: params.content_excerpt
    }

    //-- SET SLUG
    if(!attributes.slug){
        attributes.slug = TextSlugFnc(attributes.title);
    }else{
        attributes.slug = TextSlugFnc(attributes.slug);
    }

    //-- SET OPTIONS
    attributes.options = {
        image: params.image,
        gallery: params.gallery,
        files: params.files
    }

    return attributes;
}

//--------------------------------
// -- SETUP RELATEION TO POST
//--------------------------------
const setupRelatPost = async (postId, body) => {    
    try {    
        if(body.categorys.length > 0){
            await TernRelat.relatCategorie(postId, body.categorys);
        }

        if(body.tags.length > 0){
            await TernRelat.relatTags(postId, body.tags);
        }

        return await Post.queryFullByPk(postId);
    } catch (error) {
        throw `Error function{setupRelatPost} : ${error}`;   
    }
} 

//--------------------------------
// -- ACTION CREATE
//--------------------------------
exports.create = (req, res) => {
    const attributes = setupAttributes(req.body);

    // insert to database
    Post.create(attributes)
    .then( async item => {
        try {
            const respone = await setupRelatPost(item.id, req.body);
            res.send(Respone(respone));
        } catch (error) {
            console.log(error);
        }        
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};

//--------------------------------
// -- ACTION UPDATE
//--------------------------------
exports.update = (req, res) => {
    const attributes = setupAttributes(req.body);

    // update to database
    Post.update(attributes, {
        where: { id: req.model.id }
    })
    .then( async item => {
        try {
            const respone = await setupRelatPost(req.model.id, req.body);
            res.send(Respone(respone));
        } catch (error) {
            console.log(error);
        }       
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};

//--------------------------------
// -- ACTION FIND LIST
//--------------------------------
exports.findList = async (req, res) => {
    const data = await Post.queryFullList()
    if(data){
        res.send(Respone(data));
    }else{
        res.status(404).send({
            message: "Data not found"
        });
    }
};

//--------------------------------
// -- ACTION FIND PK FULL
//--------------------------------
exports.oneFull = async (req, res) => {
    const data = await Post.queryFullByPk(req.params.id)
    if(data){
        res.send(Respone(data));
    }else{
        res.status(404).send({
            message: "Data not found"
        });
    }
};

//--------------------------------
// -- ACTION ACTIVE 
//--------------------------------
exports.active = async (req, res) => {    
    Post.update({ published : req.body.published }, { where: { id: req.model.id } })
    .then((result) => {
        res.send(Respone({
            result: true
        }));
    }).catch(err => {
        res.status(500).send({
            message: "Error active with id=" + id
        });
    });     
};

//--------------------------------
// -- ACTION DELETE
//--------------------------------
exports.delete = async (req, res) => {    
    Post.update({ published : Post.isPublished.delete }, { where: { id: req.model.id } })
    .then((result) => {
        res.send(Respone({
            result: true
        }));
    }).catch(err => {
        res.status(500).send({
            message: "Error delete with id=" + id
        });
    });     
};


exports.test = async (req, res) => {
    const data = await TernRelat.relatTags(1, [
        '11111',
        '22222',
        '33333'
    ]);
    res.send(data);
}