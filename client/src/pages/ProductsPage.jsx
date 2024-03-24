import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "../utils/Alert";

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          (import.meta.env.VITE_BACKEND_URL || "") + "/api/product/all"
        );
        setProducts(response.data);
      } catch (error) {
        // console.error("Error fetching products:", error);
        Alert("error", "Error fetching products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-10">
      <h1 className="text-3xl font-bold my-8">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products?.map((product) => (
          <li key={product.id} className="bg-white rounded-lg p-4 shadow-md">
            <img src={product.imageUrl} alt="" width={500} height={100} />
            <p className="text-lg font-semibold">
              {product?.name?.length > 20
                ? product?.name?.slice(0, 20) + "..."
                : product?.name}
            </p>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
