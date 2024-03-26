import React, { useState } from "react";
import axios from "axios";
import { CheckoutModel } from "../components";
import { Alert } from "../utils/Alert";

const CartPage = ({ cart, setCart }) => {
  const [showModal, setShowModal] = useState(false);

  const removeFromCart = (productId) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      Alert("success", "Item removed from cart successfully");
    } catch (error) {
      Alert("error", "Error removing item from cart");
    }
  };

  const updateQuantity = (productId, quantity) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      Alert("success", "Cart updated successfully");
    } catch (error) {
      Alert("error", "Error updating cart");
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleModal = () => {
    if (cart?.length) {
      setShowModal(true);
    } else {
      Alert("error", "Cart is empty");
    }
  };

  async function displayRazorpay(buyerDetail) {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        Alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const result = await axios.post(
        (import.meta.env.VITE_BACKEND_URL || "") + "/api/orders/payment",
        {
          totalPrice: cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
        }
      );

      if (!result) {
        Alert("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_pmbBss9R6iW3dE", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Vowel Web",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
          console.log(response);
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          console.log({ paymentDetails: data, ...cart });
          const result = await axios.post(
            (import.meta.env.VITE_BACKEND_URL || "") + "/api/orders/add",
            {
              paymentDetails: data,
              cart,
              buyerDetail,
            }
          );
          setCart([]);
          setShowModal(false);
          localStorage.setItem("cart", JSON.stringify([]));

          Alert(result.data.msg);
        },
        prefill: {
          name: "Vowel web",
          email: "vowelweb@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Vowel web",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      Alert("error", "Error displaying Razorpay");
    }
  }

  return (
    <div className="container mx-auto px-10">
      <h1 className="text-3xl font-bold my-8">Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ul className="">
          {cart?.map((item) => (
            <li
              key={item._id}
              className="bg-white rounded-lg p-4 shadow-md flex gap-5 justify-between items-center my-2"
            >
              <img src={item.imageUrl} width={50} alt="" />
              <p className="text-lg font-semibold">
                {item?.name?.length > 50
                  ? item?.name?.slice(0, 50) + "..."
                  : item?.name}
              </p>
              <p className="text-gray-600">
                ${item.price} | Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, parseInt(e.target.value))
                  }
                  className="ml-2 w-16 border border-gray-300 rounded-md px-2 py-1"
                />
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="justify-center items-center w-full">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <p className="text-lg font-semibold mb-2">
              Total Items: {cart.length}
            </p>
            <p className="text-lg font-semibold mb-2">
              Total Price: $
              {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleModal}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
      <CheckoutModel
        showModal={showModal}
        setShowModal={setShowModal}
        displayRazorpay={displayRazorpay}
      />
    </div>
  );
};

export default CartPage;
