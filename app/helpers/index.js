const textHelper = require("./textHelper");
const upload = require("./multer");

module.exports = {
    text : textHelper,
    file : upload
};