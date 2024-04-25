const router = require("express").Router();
const controller = require("../controllers/store.controller");  

module.exports = app => {
    
    router.get("/", controller.findAll);

    app.use(app.moduleSubUrl(), router);
};
  