const express = require('express');
const app = express.Router();
const productController = require('../controllers/productController')

app.get("/", productController.getProducts);

app.get("/:id",productController.getProductById);

app.get("/name/:name",productController.getProductByName);

app.get("/poster/:name",productController.getProductByPoster);

app.post("/", productController.addProduct);

app.put("/:id", productController.editWholeProduct);

app.patch("/:id",productController.editProduct);

app.patch("/confirm/:id",productController.editRequest);

app.delete("/:id", productController.deleteProduct);

app.patch("/request/:id", productController.deleteRequest);

module.exports = app;