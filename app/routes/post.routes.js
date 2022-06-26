module.exports = app => {
    const postController = require("../controllers/post.controller.js");  
    const config = require("../config/config.js");
    const router = require("express").Router();
  
    // Create a new category
    router.post("/", postController.create);
  
    // Update a category
    //router.put("/:id", postController.update);

    // Selete all category
    router.get("/", postController.findAll);

    // Selete a category
    //router.get("/:id", postController.findOne);
  
    app.use("/"+ config.base_host_api +"/post", router);
  };