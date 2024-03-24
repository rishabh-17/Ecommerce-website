require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { OrderRoutes, ProductRoutes } = require("./routes");
const connectDB = require("./utils/ConnectDB");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/orders", OrderRoutes);
app.use("/api/product", ProductRoutes);

app.get("/", (req, res) => {
  console.log("working");
  console.log(`client/build/${req.url !== "/" ? req.url : "index.html"}`);
  res.sendFile(
    path.join(
      __dirname,
      `client/build/${req.url !== "/" ? req.url : "index.html"}`
    )
  );
});
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log("Server started on port 8000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
