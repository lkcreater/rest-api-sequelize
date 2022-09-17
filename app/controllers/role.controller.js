const db = require("../models");
const { Validator } = require('node-input-validator');
const helpers = require("../helpers");
const Role = db.role;
const Op = db.Op;

const run = () => {
    return {
        //--------------------------------
        // validator *********************
        //--------------------------------
        validator: async (req, res, next) => {
            const model = (req.params.id) ? await Role.findByPk(req.params.id) : false;
            req.isUpdate = false;
            if(model){
                req.isUpdate = true;
                req.model = model;
            }

            const v = new Validator(req.body, {
                name: 'required'
            });
        
            const matched = await v.check();        
            if (!matched) {
                res.status(422).send({errors : v.errors});
                return;
            }
            next();
        },

        //--------------------------------
        // Action ************************
        //--------------------------------
        action: async (req, res) => {
            let attrib = req.body;
            let result = false;

            if(req.isUpdate == false){
                result = await Role.create(attrib);
            }else{
                result = await Role.update(attrib,  { where: { id: req.model.id } });
            }

            if(result){
                res.send({
                    result: result
                });
            }else{
                res.status(500).send({
                    message: "Error "
                });
            }            
        },

        //--------------------------------
        // Create Admin ******************
        //--------------------------------
        createAdmin: async () => {
            const model = await Role.findOne({ where: { is_admin: true } });
            if(model === null){
                await Role.create({
                    name: 'Administrator',
                    items: ['@'],
                    is_admin: true
                });
            }
        }
    }
}

exports.validator = run().validator;

exports.create = run().action;

exports.update = run().action;

exports.findAll = async (req, res) => {   
    await run().createAdmin();

    const data = await Role.findAll({
        where: { published: true },
        order: [
            ['name', 'ASC']
        ]           
    });

    res.send({
        result: data
    });
          
}