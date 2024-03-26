import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "../utils/Alert";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get((import.meta.env.VITE_BACKEND_URL || "") + "/api/orders/all")
      .then((response) => {
        setOrders(response.data);
        // Alert("success", "Order history fetched successfully");
      })
      .catch((error) => {
        Alert("error", "Error fetching order history");

        // console.error("Error fetching order history:", error);
      });
  }, []);

  return (
    <div className="container mx-auto w-[80%]">
      <h1 className="text-3xl font-bold my-8">Order History</h1>
      <ul>
        {orders?.map((order) => (
          <li
            key={order._id}
            className="bg-white rounded-lg p-4 shadow-md mb-4"
          >
            <h2 className="text-xl font-semibold">Order #{order._id}</h2>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <p>City: {order.city}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            <h3 className="text-lg font-semibold">Products</h3>
            {order?.products?.map((item) => (
              <li
                key={item._id}
                className="bg-white rounded-lg p-4 shadow-md flex gap-10    items-center my-2"
              >
                <img src={item.imageUrl} width={50} alt="" />
                <p className="text-lg font-semibold">
                  {item?.name?.length > 50
                    ? item?.name?.slice(0, 50) + "..."
                    : item?.name}
                </p>
                <p className="text-gray-600">{item?.description}</p>
              </li>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistoryPage;
