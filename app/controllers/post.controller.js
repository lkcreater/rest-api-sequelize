const db = require("../models");
const { Validator } = require('node-input-validator');
const helpers = require("../helpers");
const Post = db.post;
const Op = db.Op;


//***********************************************************/
// controller create 
//***********************************************************/
exports.create = async (req, res) => {      

    // const upload = helpers.file.upload.array('file');

    // upload(req, res, function (err) {
    //     console.log(req.file);
    //     if (err instanceof helpers.file.multer.MulterError) {
    //       // A Multer error occurred when uploading.
    //         console.log('error 1', err);
    //     } else if (err) {
    //         console.log('error 2', err);
    //       // An unknown error occurred when uploading.
    //     }

    //     console.log(req.body);
    //     console.log('uploaded...');
    //     // Everything went fine.
    // });

    // const post = await Post.create({ 
    //     public_date_at: '2022-07-09T12:50:58.009Z',
    //     title: "test title",  
    //     options: {
    //         thumbnail: 'test thumb',
    //         action: true
    //     }
    // });

    // const post = await Post.findByPk(1);

    // console.log(post.options.thumbnail);

    db.HLEP.insertTagsOfPostId(1,['tag tes','myapp t','sdsdsd', 'tag test']);

    
    res.send({
        result: '6666'
    });

    //let input = req.body.title;
    //console.log(req);
    // res.send({
    //     result: '555'
    // });
    // validate input
    /*
    const v = new Validator(req.body, {
        title: 'required'
    });

    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send({errors : v.errors});
        }else{

            const attributes = req.body;
            //check input 'slug' require and convert to setSlug
            if(!attributes.slug){
                attributes.slug = helpers.text.setSlug(attributes.title);
            }else{
                attributes.slug = helpers.text.setSlug(attributes.slug);
            }

            // insert to database
            Post.create(attributes)
                .then(data => {
                    res.send({
                        result: data
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the item."
                    });
                });
        }
    });
    */
};

//***********************************************************/
// controller get find all
//***********************************************************/
exports.findAll = (req, res) => {
    const condition = {};
    
    Post.findAll({ where: condition })
    .then(data => {
        res.send({
            result: data
        });
    })
    .catch(err => {
        res.send(500).send({
            message: err.message || "Some error accurred while retrieving item."
        });
    });
};