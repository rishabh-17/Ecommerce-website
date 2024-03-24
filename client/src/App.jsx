import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AdminPage, CartPage, OrdersPage, ProductsPage } from "./pages";
import { Alert } from "./utils/Alert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    try {
      let updatedCart;
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProductIndex = storedCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex !== -1) {
        updatedCart = storedCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...storedCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      Alert("success", "Item added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert("error", "Error adding to cart. Please try again.");
    }
  };

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <div>
        <nav className="bg-gray-800 w-full p-4">
          <ul className="flex justify-end">
            <li className="mr-6">
              <Link to="/" className="text-white hover:text-gray-300">
                Products
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/cart" className="text-white hover:text-gray-300">
                Cart ({cart.length})
              </Link>
            </li>
            <li className="mr-6">
              <Link
                to="/order-history"
                className="text-white hover:text-gray-300"
              >
                Order History
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/admin" className="text-white hover:text-gray-300">
                Admin
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            exact
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} />}
          />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/order-history" element={<OrdersPage />} />
          <Route
            exact
            path="/"
            element={<ProductsPage addToCart={addToCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
