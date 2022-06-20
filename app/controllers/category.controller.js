const db = require("../models");
const { Validator } = require('node-input-validator');
const helpers = require("../helpers");
const Category = db.category;
const Op = db.Op;


//***********************************************************/
// controller create 
//***********************************************************/
exports.create = (req, res) => {

    // validate input
    const v = new Validator(req.body, {
        title: 'required'
    });

    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send({errors : v.errors});
        }

        const attributes = req.body;
        //check input 'slug' require and convert to setSlug
        if(!attributes.slug){
            attributes.slug = helpers.text.setSlug(attributes.title);
        }else{
            attributes.slug = helpers.text.setSlug(attributes.slug);
        }

        // insert to database
        Category.create(attributes)
            .then(data => {
                res.send({
                    result: data
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Book."
                });
            });
    });
};