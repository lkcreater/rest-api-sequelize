const { NAME_SLUG_API } = require("../config/config");
const { vertifyTokenJwt } = require("../middlewares");
const controller = require("../controllers/tag.controller.js"); 

module.exports = function(app) { 

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    const BASE_URL = `/${NAME_SLUG_API}/tag`;

    // FIND ALL
    app.get(`${BASE_URL}/all`, [vertifyTokenJwt], controller.all);

    // FIND SEARCH
    app.get(`${BASE_URL}/search`, [vertifyTokenJwt], controller.search);
}