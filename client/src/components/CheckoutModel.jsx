import React, { useState } from "react";
import { Alert } from "../utils/Alert";

export default function CheckoutModel({
  showModal,
  setShowModal,
  displayRazorpay,
}) {
  const [buyerDetail, setBuyerDetail] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
  });

  const handleBuyerDetailChange = (event, type) => {
    setBuyerDetail({ ...buyerDetail, [type]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(buyerDetail);
    if (
      buyerDetail.firstName.length === 0 ||
      buyerDetail.lastName.length === 0 ||
      buyerDetail.address.length === 0 ||
      buyerDetail.city.length === 0
    ) {
      Alert("warning", "Please fill in all fields");
      return;
    }
    displayRazorpay(buyerDetail);
    setBuyerDetail({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
    });
  };

  return (
    showModal && (
      <>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  focus:outline-none">
          <div className="relative w-[50%] my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font-semibold">General Info</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <div className="flex w-full gap-4 mb-2">
                    <div className="w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        First Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        onChange={(e) =>
                          handleBuyerDetailChange(e, "firstName")
                        }
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Last Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        onChange={(e) => handleBuyerDetailChange(e, "lastName")}
                      />
                    </div>
                  </div>
                  <label className="block text-black text-sm font-bold mb-1">
                    Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    onChange={(e) => handleBuyerDetailChange(e, "address")}
                  />
                  <label className="block text-black text-sm font-bold mb-1">
                    City
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    onChange={(e) => handleBuyerDetailChange(e, "city")}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
