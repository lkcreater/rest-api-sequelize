const db = require("../../models");
const User = db.user;

module.exports = (req, res, next) => {
    let value = null;
    if(req.body.username){
        value = req.body.username;
    } 

    if(value == null && req.body.email){
        value = req.body.email;
    }

    //-- Verify Username
    User.findOne({ 
        where: {
            username: value
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        //-- Verify Email
        User.findOne({
            where: {
                email: value
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
}