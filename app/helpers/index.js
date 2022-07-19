const textHelper = require("./textHelper");
const upload = require("./multer");
const dateTime = require("./dateTime");

module.exports = {
    text : textHelper,
    file : upload,
    date : dateTime
};