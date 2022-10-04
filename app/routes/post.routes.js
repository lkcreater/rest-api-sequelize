const { NAME_SLUG_API } = require("../config/config");
const { verifyPostByPk, formValidatePost, formValidatePostActive, vertifyTokenJwt } = require("../middlewares");
const controller = require("../controllers/post.controller.js"); 

module.exports = function(app) { 

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    const BASE_URL = `/${NAME_SLUG_API}/post`;

    // FIND LIST
    app.get(`${BASE_URL}`, [vertifyTokenJwt], controller.findList);

    // FIND PK FULL
    app.get(`${BASE_URL}/:id`, [vertifyTokenJwt], controller.oneFull);    

    // CREATE
    app.post(`${BASE_URL}`, [vertifyTokenJwt, formValidatePost], controller.create);

    // UPDATE ACTIVE
    app.put(`${BASE_URL}/active/:id`, [vertifyTokenJwt, verifyPostByPk, formValidatePostActive], controller.active);

    // UPDATE
    app.put(`${BASE_URL}/:id`, [vertifyTokenJwt, verifyPostByPk, formValidatePost], controller.update);   

    // DELETE
    app.delete(`${BASE_URL}/:id`, [vertifyTokenJwt, verifyPostByPk], controller.delete);  
}