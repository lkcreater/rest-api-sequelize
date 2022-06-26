module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");  
    const config = require("../config/config.js");
    const router = require("express").Router();
  
    // Create a new category
    router.post("/", categoryController.create);
  
    // Update a category
    router.put("/:id", categoryController.update);

    // Selete all category
    router.get("/", categoryController.findAll);

    // Selete a category
    router.get("/:id", categoryController.findOne);
  
    app.use("/"+ config.base_host_api +"/category", router);
  };