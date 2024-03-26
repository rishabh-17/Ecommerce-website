const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  totalPrice: Number,
  paymentDetails: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
