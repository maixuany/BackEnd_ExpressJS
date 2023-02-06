const express = require('express');
const ProductController = require('../../controller/productController');
const productRouter = express.Router()

productRouter.get("/", ProductController.getAllProduct);
productRouter.post("/", ProductController.createProduct);
productRouter.get("/:id_product", ProductController.getProduct);
productRouter.delete("/:id_product", ProductController.deleteProduct);
productRouter.put("/:id_product", ProductController.editProduct);

module.exports = productRouter;