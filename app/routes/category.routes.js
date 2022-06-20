module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");
  
    const router = require("express").Router();
  
    // Create a new Book
    router.post("/", categoryController.create);
  
    // Retrieve all Books
    router.get("/", categoryController.create);

  
    app.use("/api/category", router);
  };