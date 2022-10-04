const { NAME_SLUG_API } = require("../config/config");
const { Multer } = require("../plugins")
const { uploadFileSingle, uploadMultiFile, readFileUpload, vertifyTokenJwt } = require("../middlewares");
const controller = require("../controllers/media.controller.js"); 

const setFilterGallery = (req, res, next) => {
    req.filterFiles = ['png', 'jpg', 'jpeg'];
    next();
};

const setFilterAttachment = (req, res, next) => {
    req.filterFiles = ['doc', 'docx', 'xls', 'xlsx', 'pdf'];
    next();
};

const setFilterAll = (req, res, next) => {
    req.filterFiles = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'png', 'jpg', 'jpeg'];
    next();
};

module.exports = function(app) {

    const BASE_URL = `/${NAME_SLUG_API}/media`;

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    // READ FILE
    app.get(`/${Multer.PATH_URL}/:path/:filename`, [readFileUpload], controller.read);

    // UPLOAD FILE SINGLE
    app.post(`${BASE_URL}/upload/file`, [vertifyTokenJwt, setFilterAll, uploadFileSingle], controller.upload);

    // UPLOAD FILE SINGLE IMAGE
    app.post(`${BASE_URL}/upload/image`, [vertifyTokenJwt, uploadFileSingle], controller.upload);

    // UPLOAD FILE MULTIPLE
    app.post(`${BASE_URL}/upload/multi-file`, [vertifyTokenJwt, setFilterAll, uploadMultiFile], controller.multiUpload);

    // UPLOAD FILE MULTIPLE GALLERY
    app.post(`${BASE_URL}/upload/gallery`, [vertifyTokenJwt, setFilterGallery, uploadMultiFile], controller.multiUpload);

    // UPLOAD FILE MULTIPLE ATTACHMENT
    app.post(`${BASE_URL}/upload/attachment`, [vertifyTokenJwt, setFilterAttachment, uploadMultiFile], controller.multiUpload);
};