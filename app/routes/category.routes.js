const { NAME_SLUG_API } = require("../config/config");
const { formValidateCategory } = require("../middlewares");
const controller = require("../controllers/category.controller.js"); 

module.exports = function(app) {

    const BASE_URL = `/${NAME_SLUG_API}/category`;

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    // FIND ALL
    app.get(`${BASE_URL}`, controller.findAll);

    // FIND ALL LIST
    app.get(`${BASE_URL}/list`, controller.findList);

    // FIND PK
    app.get(`${BASE_URL}/:id`, controller.findOne);
       
    // CREATE
    app.post(`${BASE_URL}`, [formValidateCategory], controller.create);
  
    // UPDATE
    app.put(`${BASE_URL}/:id`, [formValidateCategory], controller.update);   
    
    // DELETE
    app.delete(`${BASE_URL}/:id`, controller.delete);  
};