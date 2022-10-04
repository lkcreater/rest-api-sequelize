const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports =  (userId) => {    
    let token = jwt.sign({ id: userId }, config.auth.secret, {
        expiresIn: config.auth.expiresIn
    });

    return token
}