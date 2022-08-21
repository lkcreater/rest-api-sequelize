module.exports = app => {
    const postController = require("../controllers/post.controller.js");  
    const config = require("../config/config.js");
    const router = require("express").Router();
    const { checkReqPostByPk, uploadFile } = postController.middle;
  
    // Create a new category
    router.post("/", [checkReqPostByPk, uploadFile], postController.create);
  
    // Update a category
    router.put("/:id", [checkReqPostByPk, uploadFile], postController.update);

    // Selete all category
    router.get("/", postController.findAll);

    // Selete all category
    router.get("/:id", postController.findOne);

    // delete post by id
    router.put("/active/:id", postController.active);

     // delete post by id
     router.delete("/:id", postController.delete);

    // Selete a category
    //router.get("/:id", postController.findOne);
  
    app.use("/"+ config.base_host_api +"/post", router);
  };