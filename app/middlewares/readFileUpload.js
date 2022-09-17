const { Multer } = require("../plugins")

module.exports = (req, res, next) => {
    req.dirFile =  Multer.objectPath(req.params.filename, req.params.path);
    next();   
}