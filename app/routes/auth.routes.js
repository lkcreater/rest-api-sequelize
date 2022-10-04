const { NAME_SLUG_API } = require("../config/config");
const { verifyUsernameOrEmail, formValidateUserRegister, formValidateLogin, vertifyTokenJwt} = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {    

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    const BASE_URL = `/${NAME_SLUG_API}/auth`;

    app.post(`${BASE_URL}/signup`, [vertifyTokenJwt, verifyUsernameOrEmail, formValidateUserRegister], controller.register);

    app.post(`${BASE_URL}/signin`, [formValidateLogin], controller.signin);

    app.post(`${BASE_URL}/sync`, [vertifyTokenJwt], controller.syncToken);
};
