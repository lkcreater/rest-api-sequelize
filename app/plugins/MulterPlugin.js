const multer  = require('multer');
const Mime = require('mime-types');
const moment = require('moment');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//-- FUNC MOVE FILE
const $moveFile = (file, dest)=>{  
    fs.rename(file, dest, (err)=>{
        if(err) throw err;
        else console.log('Successfully moved');
    });
};

//-- FUNC CREATE FOLDER
function $folder(path){
    if (!fs.existsSync(path)){
        fs.mkdir(path, { recursive: true }, (err) => {
            if(err) throw err;           
        });
    }

    return path;    
}

//-- SETUP INSTANT
const App = {}

const DATE_NOW = moment().format('YYYY-MM-DD');

const ROOT_FOLDER = 'uploads';

const SUB_FOLDER_NAME = moment().format('YYYY-MM');

const SUB_TMP_FOLDER = `TMP_${DATE_NOW}`;

//-- PATH URL
App.PATH_URL = 'v';

//-- ROOT FOLDER
App.getRootFolder = ( is_path = false ) => {
    const respone = $folder( path.normalize(`${__dirname}../../../${ROOT_FOLDER}`) );

    return (is_path) ? respone : ROOT_FOLDER;    
} 

//-- SUB FOLDER
App.getSubFolder = ( is_path = false ) => {
    const rootPath = App.getRootFolder(true);
    const respone = $folder( path.normalize(`${rootPath}/${SUB_FOLDER_NAME}`) );

    return (is_path) ? respone : SUB_FOLDER_NAME;
}

//-- TMP FOLDER
App.objectPath = (filename, subPath) => {
    const rootPath = App.getRootFolder(true);
    const respone = $folder( path.normalize(`${rootPath}/${subPath}/`) );

    if (fs.existsSync(respone)){
        return {
            filename: filename,
            path: respone
        }
    }
    return false;  
}

//-- FULL PATH
App.getFullPath = (_path) => {
    const rootPath = App.getRootFolder(true);
    const respone = $folder( path.normalize(`${rootPath}/${_path}`) );

    return (_path) ? respone : false;
}

//-- GET URL
App.getUrl = (file, subDir) => {
    const sub_path = (subDir) ? subDir : App.getSubFolder();
    return `${App.PATH_URL}/${sub_path}/${file}`;
}

//-- CONVERT FILE
App.convertFile = (file, isTmp=true) => {
    const subDirName = (file.subDirName) ? file.subDirName : App.getSubFolder();

    return {
        originalname: file.originalname,
        filename: file.filename,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
        subDirName: subDirName,
        url: App.getUrl(file.filename, subDirName)
    }
} 

//-- FUNC MULTER
App.$upload = (filterArray) => {
    let self = {}
    
    // setup filterArray type file
    if(filterArray){
        if(!Array.isArray(filterArray)){
            throw 'Argument $upload is not Array';
        }

        self.filterFile = (req, file, cb) => {
            const fileType =  Mime.extension(file.mimetype);
            if(filterArray.includes( fileType )){
                cb(null, true);
            }else{
                const strErr = filterArray.join(', ').toUpperCase();
                cb(`Please upload the file: ${strErr}`, false);
            }
        }
    }else{
        self.filterFile = (req, file, cb) => {
            cb(null, true);
        }
    }

    // load functon multer
    return multer({ 
        fileFilter: self.filterFile,
        storage: multer.diskStorage({    
            destination: (req, file, cb) => {
                cb(null, App.getSubFolder(true));
            },
            filename: (req, file, cb) => {
                cb(null, uuidv4() + '.' + Mime.extension(file.mimetype))
            }
        })
    })
}

// handle error
App.MulterError = multer.MulterError;

module.exports = App;