const { NAME_SLUG_API } = require("../config/config");
const { verifyUsernameOrEmail, formValidateUserRegister, validateFindUserOrEmail, vertifyTokenJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");



module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //app.use(vertifyTokenJwt);

    const BASE_URL = `/${NAME_SLUG_API}/users`;

    // FIND ALL
    app.get(`${BASE_URL}`, [vertifyTokenJwt], controller.findAll);

    // FIND USER OR EMAIL
    app.get(`${BASE_URL}/me`, [vertifyTokenJwt], controller.findMe);

    // FIND USER OR EMAIL
    app.post(`${BASE_URL}/user-email`, [vertifyTokenJwt, validateFindUserOrEmail], controller.findUserOrEmail);

    // CREATE USER
    app.post(`${BASE_URL}`, [vertifyTokenJwt, verifyUsernameOrEmail, formValidateUserRegister], controller.create);
};
