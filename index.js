require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OrderRoutes, ProductRoutes } = require("./routes");
const connectDB = require("./utils/ConnectDB");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/orders", OrderRoutes);
app.use("/api/product", ProductRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log("Server started on port 8000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
