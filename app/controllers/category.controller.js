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


//***********************************************************/
// controller update 
//***********************************************************/
exports.update = (req, res) => {

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

        // update to database
        const id = req.params.id;
        Category.update(attributes, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    result: num
                });
            } else {
                res.send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });        
    });
};


//***********************************************************/
// controller get find all
//***********************************************************/
exports.findAll = (req, res) => {
    const condition = {};
    
    Category.findAll({ where: condition })
    .then(data => {
        res.send({
            result: data
        });
    })
    .catch(err => {
        res.send(500).send({
            message: err.message || "Some error accurred while retrieving books."
        });
    });
};


//***********************************************************/
// controller get find one
//***********************************************************/
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Category.findByPk(id)
    .then(data => {
        res.send({
            result: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving Book with id = ${id}`
        });
    });
};