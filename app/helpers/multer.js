const multer  = require('multer');
const path = require('path');
var mime = require('mime-types');
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

/*** generate name sub directory */
/********************************************/
const subDir = function(){
    return moment().format('YYYY-MM');
}

/*** check and create directory */
/********************************************/
const dirPath = function(hasSubDir = true){
    let subdir = subDir();
    let dir = path.normalize(__dirname + '../../../uploads');
    if(hasSubDir){
        dir = path.normalize(dir + '/' + subdir);
    }
    if (!fs.existsSync(dir)){
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
    return dir;
}

/*** filter file upload */
/********************************************/
const fileFilter = function (req, file, cb) {
    const fileType =  mime.extension(file.mimetype);
    cb(null, true);
};

/*** config multer and path */
/********************************************/
const storage = multer.diskStorage({    
    destination: function (req, file, cb) {
        cb(null, dirPath())
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '.' + mime.extension(file.mimetype))
    }
})

/*** export function */
/********************************************/
module.exports = {
    subDirName: subDir(),
    subDirPath: dirPath(),
    dirPath: dirPath(false),
    multer: multer,
    upload: multer({ 
        fileFilter: fileFilter,
        storage: storage 
    })
}