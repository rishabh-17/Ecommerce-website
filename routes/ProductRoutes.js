const router = require("express").Router();
const Product = require("../models/ProductModel");
const { productController } = require("../controllers");
router.post("/add", productController.addProduct);

router.get("/all", productController.getAllProducts);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
