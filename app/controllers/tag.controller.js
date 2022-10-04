const db = require("../models");
const { Respone } = require('../plugins');
const Tag = db.tag;

//--------------------------------
// -- ACTION SEARCH
//--------------------------------
exports.search = (req, res) => {
    const text = (req.query.title) ? req.query.title : req.body.title;
    if(!text){
        return res.status(500).send({
            message: "Title not is null"
        });
    }

    Tag.queurySearch(text)
    .then(data => {
        res.send(Respone(data));
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};

//--------------------------------
// -- ACTION ALL
//--------------------------------
exports.all = (req, res) => {
    Tag.queuryAll(['id', 'title'])
    .then(data => {
        res.send(Respone(data));
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};