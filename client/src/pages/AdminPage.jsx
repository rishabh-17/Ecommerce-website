import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import { Alert } from "../utils/Alert";

const AdminPage = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get((import.meta.env.VITE_BACKEND_URL || "") + "/api/product/all")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching products");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !images.length
    ) {
      Alert("warning", "Please fill in all fields");
      return;
    }
    axios
      .post((import.meta.env.VITE_BACKEND_URL || "") + "/api/product/add", {
        ...formData,
        image: images?.[0],
      })
      .then((res) => {
        setFormData({
          name: "",
          price: "",
          description: "",
        });
        setImages([]);
        setError("");
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        Alert("error", "Error adding product");
      });
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleDelete = (productId) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL || ""}/api/product/${productId}`
      )
      .then((res) => {
        fetchProducts();
        Alert("success", "Product deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        Alert("error", "Error deleting product");
      });
  };

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold my-8">Admin Panel</h1>
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="max-w-md">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block mb-4">
              <span className="text-gray-700">Product Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input mt-1 block w-full border-2 rounded-lg"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Price:</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="form-input mt-1 block w-full border-2 rounded-lg"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Description:</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-textarea mt-1 block w-full border-2 rounded-lg"
              />
            </label>
            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper m-auto my-5 p-5 border rounded-xl">
                  {!imageList?.length && (
                    <button
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                  )}
                  &nbsp;
                  {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                  {imageList?.map((image, index) => (
                    <div key={index} className="image-item grid">
                      <img src={image["data_url"]} alt="" width="150" />
                      <div className="image-item__btn-wrapper">
                        <button
                          className="text-violet-700 px-4 rounded-full bg-violet-50 mr-4 py-2 mt-2"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </button>
                        <button
                          className="text-red-700 px-4 rounded-full bg-red-50 mr-4 py-2 mt-2"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Upload Product
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Product List</h2>
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 mb-4 rounded-lg flex gap-4 items-center"
            >
              <img src={product.imageUrl} alt="" width={50} />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="font-semibold">Price: ${product.price}</p>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 h-8 "
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
