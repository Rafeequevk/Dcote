import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const CreateBooking = () => {
  const [billNo, setBillNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [staffAttended, setStaffAttended] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0, images: [] },
  ]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleItemChange = (index, event) => {
    const values = [...items];
    if (event.target.name === "images") {
      values[index][event.target.name] = [...event.target.files];
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setItems(values);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0, images: [] }]);
  };

  const removeItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("billNo", billNo);
    formData.append("customerName", customerName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("deliveryDate", deliveryDate);
    formData.append("staffAttended", staffAttended);

    items.forEach((item, index) => {
      formData.append(`items[${index}][name]`, item.name);
      formData.append(`items[${index}][quantity]`, item.quantity);
      formData.append(`items[${index}][price]`, item.price);
      item.images.forEach((image) => {
        formData.append("images", image);
      });
    });

    try {
      const response = await axios.post(
        "http://localhost:3030/booking",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      navigate('/')
    } catch (error) {
      setMessage("Error creating booking");
    }
  };

  const captureImage = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedItems = [...items];
        updatedItems[index].images = [file];
        setItems(updatedItems);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = (itemIndex, imgIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].images = updatedItems[itemIndex].images.filter((_, index) => index !== imgIndex);
    setItems(updatedItems);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
        <BackButton/>
        <h1 className="text-2xl font-bold  text-gray-800">Create Booking</h1>
        </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-semibold">Bill No:</label>
          <div className="relative">
            <input
              type="text"
              value={billNo}
              onChange={(e) => setBillNo(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-2 right-3 text-gray-400">
              <i className="fas fa-file-invoice-dollar"></i>
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-semibold">Customer Name:</label>
          <div className="relative">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-2 right-3 text-gray-400">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-semibold">Mobile Number:</label>
          <div className="relative">
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-2 right-3 text-gray-400">
              <i className="fas fa-phone-alt"></i>
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-semibold">Delivery Date:</label>
          <div className="relative">
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-2 right-3 text-gray-400">
              <i className="fas fa-calendar-alt"></i>
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-semibold">Staff Attended:</label>
          <div className="relative">
            <input
              type="text"
              value={staffAttended}
              onChange={(e) => setStaffAttended(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-2 right-3 text-gray-400">
              <i className="fas fa-user-nurse"></i>
            </span>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 text-gray-700">Items</h2>
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4"
          >
            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-semibold">Item Name:</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute top-2 right-3 text-gray-400">
                  <i className="fas fa-tag"></i>
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-semibold">Quantity:</label>
              <div className="relative">
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute top-2 right-3 text-gray-400">
                  <i className="fas fa-sort-numeric-up-alt"></i>
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-semibold">Price:</label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute top-2 right-3 text-gray-400">
                  <i className="fas fa-dollar-sign"></i>
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-semibold">Images:</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  capture="environment" // Use "environment" for rear camera, "user" for front camera
                  multiple
                />
                <span className="absolute top-2 right-3 text-gray-400">
                  <i className="fas fa-camera"></i>
                </span>
              </div>
              {/* <div className="mt-2 flex flex-wrap">
                {item.images.length > 0 &&
                  Array.from(item.images).map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${imgIndex + 1}`}
                      className="w-24 h-24 object-cover rounded-md mr-2 mb-2"
                    />
                  ))}
              </div> */}

<div className="mt-2 flex flex-wrap">
                {item.images.length > 0 &&
                  item.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${imgIndex + 1}`}
                        className="w-24 h-24 object-cover rounded-md mr-2 mb-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, imgIndex)}
                        className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 hover:text-red-700"
                        aria-label="Remove Image"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
              </div>
              
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700"
        >
          Add Item
        </button>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-700"
        >
          Create Booking
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default CreateBooking;
