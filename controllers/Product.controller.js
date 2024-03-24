const cloudinary = require("cloudinary").v2;
const { Product } = require("../models");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const imageUrl = await cloudinary.uploader.upload(image.data_url);
    console.log(imageUrl);
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl: imageUrl.url,
    });
    console.log(newProduct);

    newProduct
      .save()
      .then((product) => res.json(product))
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Some error occurred");
  }
};

exports.getAllProducts = (req, res) => {
  try {
    Product.find()
      .then((products) => res.json(products))
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Some error occurred");
  }
};

exports.deleteProduct = (req, res) => {
  try {
    Product.findByIdAndDelete(req.params.id)
      .then((product) => res.json(product))
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Some error occurred");
  }
};
