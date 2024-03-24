const router = require("express").Router();
const Order = require("../models/OrderModel");
const { orderController } = require("../controllers");
router.post("/add", orderController.addOrder);
router.post("/payment", orderController.payment);
router.get("/all", orderController.getAllOrders);

module.exports = router;
