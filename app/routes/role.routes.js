module.exports = app => {
    const roleController = require("../controllers/role.controller.js");  
    const config = require("../config/config.js");
    const router = require("express").Router();
  
    // FIND ALL
    router.get("/", roleController.findAll);

    // CREATE 
    router.post("/", [roleController.validator], roleController.create);
  
    // UPDATE
    router.put("/:id", [roleController.validator], roleController.update);

    // // Selete all category
    // router.get("/", roleController.findAll);

    // // Selete all category
    // router.get("/:id", roleController.findOne);

    // // delete post by id
    // router.put("/active/:id", roleController.active);

    //  // delete post by id
    //  router.delete("/:id", roleController.delete);

    // Selete a category
    //router.get("/:id", roleController.findOne);
  
    app.use("/"+ config.base_host_api +"/role", router);
  };