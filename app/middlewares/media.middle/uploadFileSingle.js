const { Multer } = require("../../plugins")

module.exports = (req, res, next) => {
    // setup filter type file
    const filterFile = (req.filterFiles) ? req.filterFiles : ['png', 'jpg', 'jpeg'];
    // func upload
    const uploads = Multer.$upload(filterFile).single('file');

    uploads(req, res, async (err) => {
        // handle error
        if (err instanceof Multer.MulterError) {   
            return res.status(500).send({
                message: "A Multer error occurred when uploading."
            });
        } else if (err) {
            return res.status(500).send({
                message: err || "An unknown error occurred when uploading."
            });        
        }
        
        req.file = Multer.convertFile(req.file);
        next();
    })
}