const { Validator } = require('node-input-validator');
const { SendErrorMsg } = require("../../plugins");

module.exports = async (req, res, next) => {
    const fieldVertify = ['username', 'email'];
    const v = new Validator(req.body, {
        field: 'required',
        value: 'required',
    });

    const matched = await v.check();        
    if (!matched) {
        res.status(422).send({errors : SendErrorMsg(v.errors)});
        return;
    }

    if(!fieldVertify.includes(req.body.field.toLowerCase())){
        res.status(422).send({errors : [
            `Field : not match { ${fieldVertify.join(', ')} }`
        ]});
        return;
    }

    next();
}