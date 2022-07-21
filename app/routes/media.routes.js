const { authJwt } = require("../middlewares");
const $helper = require("../helpers");

module.exports = (app) => {
    app.get("/" + $helper.file.nameUrlApi + "/:subPath/:mediaId", (req, res, next) => {

        const filename = req.params.mediaId;
        const dirPath = $helper.file.getPath( req.params.subPath );

        if(!dirPath){
            res.status(404).send('Not Found Directory!');
        }

        let options = {
            root: dirPath
        }

        res.sendFile(filename, options, (err) => {
            if (err) {
                res.status(404).send('Not Found');
            } 
        });
    });
}