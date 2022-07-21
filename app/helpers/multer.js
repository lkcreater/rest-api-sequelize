const multer  = require('multer');
const path = require('path');
var mime = require('mime-types');
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//-- init instance
const fileManage = {
    rootFolder: 'uploads',
    nameUrlApi: 'media',
    multer: multer
}

//-- generate full directory path
fileManage.fullDirPath = () => {
    return path.normalize(__dirname + '../../../' + fileManage.rootFolder);
}

//-- generate name sub directory 
fileManage.subDir = () => {
    return moment().format('YYYY-MM');
}

//-- get name url
fileManage.getUrl = (subDirName=null) => {
    const subPath = (subDirName) ? subDirName : fileManage.subDir();
    return '/' + fileManage.nameUrlApi + '/' + subPath + '/';
}

//-- get name url
fileManage.getPath = (subDirName=null) => {
    const subPath = (subDirName) ? subDirName : fileManage.subDir();
    const pathName = path.normalize(fileManage.fullDirPath() + '/' + subPath + '/');
    if (fs.existsSync(pathName)){
        return pathName;
    }
    return null;        
}

//-- get file upload object
fileManage.getFileData = (object) => {
    return {
        filename: object.filename,
        encoding: object.encoding,
        mimetype: object.mimetype,
        size: object.size,
        subDirName: (object.subDirName) ? object.subDirName : fileManage.subDir(),
        url: (object.url) ? object.url : fileManage.getUrl() + object.filename
    }
}

//-- check path and create directory 
fileManage.existsSyncPath = (hasSubPath=true) => {
    // load element
    const subDirPath = fileManage.subDir();
    let fullPath = fileManage.fullDirPath();

    // check sub path
    if(hasSubPath){
        fullPath = path.normalize(fullPath + '/' + subDirPath);
    }

    // check path and create
    if (!fs.existsSync(fullPath)){
        fs.mkdir(fullPath, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
    
    // return result
    return fullPath;
}

//-- load function Multer
fileManage.upload = multer({ 
    fileFilter: (req, file, cb) => {
        const fileType =  mime.extension(file.mimetype);
        cb(null, true);
    },
    storage: multer.diskStorage({    
        destination: (req, file, cb) => {
            cb(null, fileManage.existsSyncPath())
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + '.' + mime.extension(file.mimetype))
        }
    })
})

module.exports = fileManage;