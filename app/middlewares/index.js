const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyUsernameOrEmail = require("./verifyUsernameOrEmail");

module.exports = {
  authJwt,
  verifySignUp,
  verifyUsernameOrEmail: require("./verifyUsernameOrEmail"),
  formValidateUserRegister: require("./formValidateUserRegister"),
  formValidateCategory: require("./formValidateCategory"),
  readFileUpload: require("./readFileUpload"),
  uploadFileSingle: require("./uploadFileSingle"),
  uploadMultiFile: require("./uploadMultiFile")
};
