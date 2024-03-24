const Razorpay = require("razorpay");
const { Order } = require("../models");

exports.payment = async (req, res) => {
  const { totalPrice } = req.body;

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) {
      throw new Error("Failed to create order");
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Some error occurred");
  }
};

exports.addOrder = (req, res) => {
  try {
    const { cart, paymentDetails } = req.body;
    const newOrder = new Order({
      products: cart,
      totalPrice: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      paymentDetails: JSON.stringify(paymentDetails),
    });
    newOrder
      .save()
      .then((order) => res.json({ msg: "Order added successfully" }))
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Some error occurred");
  }
};

exports.getAllOrders = (req, res) => {
  try {
    Order.find()
      .populate("products")
      .then((orders) => res.json(orders))
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Some error occurred");
  }
};
