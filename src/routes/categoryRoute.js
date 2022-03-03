const express = require('express');
const app = express.Router();
const categoryController = require('../controllers/categoryController')

app.get("/", categoryController.getCategory);
app.get("/:id",categoryController.getCategoryById);
app.get("/name/:name",categoryController.getCategoryByName);

app.post("/", categoryController.addCategory);

app.put("/:id", categoryController.editCetegory);

app.delete("/:id", categoryController.deleteCategory);


module.exports = app;