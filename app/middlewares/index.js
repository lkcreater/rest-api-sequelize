const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyUsernameOrEmail = require("./auth.middle/verifyUsernameOrEmail");

module.exports = {
  authJwt,
  verifySignUp,
  //-- user middle
  validateFindUserOrEmail: require("./user.middle/validateFindUserOrEmail"),
  //-- auth middle
  verifyUsernameOrEmail: require("./auth.middle/verifyUsernameOrEmail"),
  formValidateUserRegister: require("./auth.middle/formValidateUserRegister"),
  formValidateLogin: require("./auth.middle/formValidateLogin"),
  vertifyTokenJwt: require("./auth.middle/vertifyTokenJwt"),
  //-- post middle
  formValidatePostActive: require("./post.middle/formValidatePostActive"),
  formValidatePost: require("./post.middle/formValidatePost"),
  verifyPostByPk: require("./post.middle/verifyPostByPk"),
  //-- category middle
  formValidateCategory: require("./category.middle/formValidateCategory"),
  //-- media middle
  readFileUpload: require("./media.middle/readFileUpload"),
  uploadFileSingle: require("./media.middle/uploadFileSingle"),
  uploadMultiFile: require("./media.middle/uploadMultiFile")
};
