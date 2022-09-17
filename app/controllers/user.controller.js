const db = require("../models");
const { Validator } = require('node-input-validator');
const helpers = require("../helpers");
const User = db.user;
const Op = db.Op;

//--------------------------------
// -- ACTION
//--------------------------------
exports.findAll = (req, res) => {
    User.listAll().then(items => {
        res.send({
            result: items
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });    
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.register = (req, res) => {
    res.status(200).send("Moderator Content.");
};
