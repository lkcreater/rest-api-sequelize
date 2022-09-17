const { NAME_SLUG_API } = require("../config/config");
const { verifyUsernameOrEmail, formValidateUserRegister } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {

    const BASE_URL = `/${NAME_SLUG_API}/auth`;

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post(`${BASE_URL}/register`, [verifyUsernameOrEmail, formValidateUserRegister], controller.register);

    app.post(`${BASE_URL}/signin`, controller.signin);

    app.post(`${BASE_URL}/test`, [verifyUsernameOrEmail], controller.test);
};
