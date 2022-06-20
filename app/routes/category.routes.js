module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");  
    const router = require("express").Router();
  
    // Create a new category
    router.post("/", categoryController.create);
  
    // Update a category
    router.put("/:id", categoryController.update);

    // Selete all category
    router.get("/", categoryController.findAll);

    // Selete a category
    router.get("/:id", categoryController.findOne);
  
    app.use("/api/category", router);
  };