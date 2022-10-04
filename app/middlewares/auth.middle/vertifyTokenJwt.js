const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const moment = require("moment");

module.exports = (req, res, next) => {
    let token = req.headers[config.auth.headerKeyToken];

    if (!token) {
        console.log(`header : ${req.socket.remoteAddress}`);
        return res.status(403).send({
            message: "Forbidden"
        });
    }

    jwt.verify(token, config.auth.secret, (err, decoded) => {
        //console.log(err);
        if(err){
            if (err.name === 'TokenExpiredError') {                
                return res.status(401).send({                        
                    code: 'TOKEN_EXPIRED_ERR',
                    action: 'GO_TO_SIGNIN',
                    message: "Token expired!"
                });
            }else{
                return res.status(401).send({
                    message: "Token unauthorized!"
                });
            }
        }
    
        req.userId = decoded.id;    
        next();
    });
}