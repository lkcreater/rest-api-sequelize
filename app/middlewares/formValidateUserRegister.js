const { Validator } = require('node-input-validator');

module.exports = async (req, res, next) => {
    const v = new Validator(req.body, {
        username: 'required',
        password: 'required',
        email: 'required|email',
        firstname: 'required',
        surename: 'required',
        phone: 'required',
        birthday: 'required',
        sex: 'required',
    });

    const matched = await v.check();        
    if (!matched) {
        res.status(422).send({errors : v.errors});
        return;
    }
    next();
}