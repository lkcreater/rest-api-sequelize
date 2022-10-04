const { Respone, JwtToken } = require("../plugins");
const { register } = require("./auth.controller");
const db = require("../models");
const User = db.user;

//--------------------------------
// -- ACTION FIND ME
//--------------------------------
exports.findMe = async (req, res) => {
    let token = JwtToken(req.userId);

    const model = await User.queryByPk(req.userId);    
    if(model){
        await User.setLastToken(req.userId, token);
        model.accessToken = token;
        res.send(Respone(model));
    }else{
        res.status(500).send({ message: "User is NULL of database." });
    }
};

//--------------------------------
// -- ACTION FIND USER OR EMAIL
//--------------------------------
exports.findUserOrEmail = (req, res) => {
    const object = {};
    object[req.body.field.toLowerCase()] = req.body.value;

    User.queryUsernameOrEmail(object)
    .then( model => {
        const respon = (model) ? {
            isHas : true,
            message: `${req.body.field} already exists`
        } : {
            isHas : false,
            message: `${req.body.field} can be used`
        }
        
        res.send(Respone(respon));
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });    
};


//--------------------------------
// -- ACTION
//--------------------------------
exports.findAll = (req, res) => {
    User.queryFullList().then(items => {
        res.send(Respone(items));
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });    
};


//--------------------------------
// -- ACTION CREATE USER
//--------------------------------
exports.create = register;



exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.register = (req, res) => {
    res.status(200).send("Moderator Content.");
};
