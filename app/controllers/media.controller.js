const { Respone } = require("../plugins");

//--------------------------------
// -- UPLOAD SINGLE
//--------------------------------
exports.upload = (req, res) => {
    if(req.file){
        res.send(Respone(req.file));
    }else{
        return res.status(500).send({
            message: "Error file not found!"
        });  
    }
}

//--------------------------------
// -- UPLOAD ARRAY
//--------------------------------
exports.multiUpload = (req, res) => {
    if(req.files){
        res.send(Respone(req.files));
    }else{
        return res.status(500).send({
            message: "Error file not found!"
        });  
    }
}

//--------------------------------
// -- READ FILE
//--------------------------------
exports.read = (req, res) => {
    if(!req.dirFile){
        res.status(404).send('Not Found Directory!');
    }else{
        res.sendFile(req.dirFile.filename, { root: req.dirFile.path }, (err) => {
            if (err) {
                res.status(404).send('Not Found');
            } 
        });
    }    
}