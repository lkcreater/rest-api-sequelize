const { NAME_SLUG_API } = require("../config/config");
const { formValidateCategory, vertifyTokenJwt } = require("../middlewares");
const controller = require("../controllers/category.controller.js"); 

module.exports = function(app) {   

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    const BASE_URL = `/${NAME_SLUG_API}/category`;

    // FIND ALL
    app.get(`${BASE_URL}`, [vertifyTokenJwt], controller.findAll);

    // FIND ALL LIST
    app.get(`${BASE_URL}/list`, [vertifyTokenJwt], controller.findList);

    // FIND PK
    app.get(`${BASE_URL}/:id`, [vertifyTokenJwt], controller.findOne);
       
    // CREATE
    app.post(`${BASE_URL}`, [vertifyTokenJwt, formValidateCategory], controller.create);
  
    // UPDATE
    app.put(`${BASE_URL}/:id`, [vertifyTokenJwt, formValidateCategory], controller.update);   
    
    // DELETE
    app.delete(`${BASE_URL}/:id`, [vertifyTokenJwt], controller.delete);  
};