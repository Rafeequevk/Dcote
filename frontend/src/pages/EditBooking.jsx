import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes, FaCamera } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { backEndUrl } from "../../config/envVars";
import { formatDate } from "../../utils/DateConverter.js";
import { fileStorageUrl } from "../../config/envVars.js";

const EditBooking = () => {
  const [billNo, setBillNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [staffAttended, setStaffAttended] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0, images: [] },
  ]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${backEndUrl}/booking/${id}`).then((response) => {
      const booking = response.data;

      setBillNo(booking.billNo);
      setCustomerName(booking.customerName);
      setMobileNumber(booking.mobileNumber);
      setDeliveryDate(formatDate(booking.deliveryDate));
      setStaffAttended(booking.staffAttended);

      setItems(
        booking.items.map((item) => ({
          ...item,
          images: item.imageUrl.map((imgurl) => ({ url: imgurl, file: null })),
        }))
      );
    });
  }, []);

  const handleItemChange = (index, event) => {
    const values = [...items];
    if (event.target.name === "images") {
      const files = Array.from(event.target.files); // Ensure multiple images are handled
      // values[index].images = [...values[index].images, ...files]; // Append new images to the existing ones
      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })); // Store file and preview URL
      values[index].images = [...values[index].images, ...newImages];

      // values[index][event.target.name] = [...event.target.files];
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
      // Attach multiple images for each item

      //   item.images.forEach((image) => {
      //     formData.append(`items[${index}][images]`, image);
      //   });
      // });

      item.images.forEach((image) => {
        if (image.file) {
          formData.append(`items[${index}][images]`, image.file); // New image file
        } else {
          formData.append(`items[${index}][images]`, image.url); // Existing image URL
        }
      });
    });

    try {
      const response = await axios.put(
        `${backEndUrl}/booking/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      navigate("/");
      console.log(formData);
    } catch (error) {
      setMessage("Error creating booking");
    }
  };

  // const captureImage = (index, event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const updatedItems = [...items];
  //       updatedItems[index].images = [file];
  //       setItems(updatedItems);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleRemoveImage = async(itemIndex, imgIndex) => {
  //   const updatedItems = [...items];
  //   updatedItems[itemIndex].images = updatedItems[itemIndex].images.filter(
  //     (_, index) => index !== imgIndex
  //   );
  //   setItems(updatedItems);
  // };

  const handleRemoveImage = async (itemIndex, imgIndex) => {
    const updatedItems = [...items];
    const image = updatedItems[itemIndex].images[imgIndex];

    if (image.file) {
      // This is a newly uploaded image (temporary), just remove it from the front end
      updatedItems[itemIndex].images = updatedItems[itemIndex].images.filter(
        (_, index) => index !== imgIndex
      );
      setItems(updatedItems);
    } else {
      // This is an existing image from the DB, send a delete request to the server
      try {
        const response = await axios.delete(
          `${backEndUrl}/booking/${id}/delete-image`,
          {
            params: { imageUrl: image.url }, // Pass the image URL as a query parameter
          }
        );

        if (response.status === 200) {
          // Remove the image from the state if successfully deleted from the server
          updatedItems[itemIndex].images = updatedItems[
            itemIndex
          ].images.filter((_, index) => index !== imgIndex);
          setItems(updatedItems);
        } else {
          console.error("Failed to delete image from server");
        }
      } catch (error) {
        console.error("Error deleting image from server:", error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold  text-gray-800">Edit Booking</h1>
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
              min={new Date().toISOString().slice(0, 10)}
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
              {/* <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  capture="environment" // Use "environment" for rear camera, "user" for front camera
                  multiple
                />
                <span className="absolute top-2 right-3 felx items-center">
                  
                  <FaCamera className="text-2xl "/>
                  <i className="fas fa-camera"></i>
                </span>
              </div> */}

              <div className="relative">
                {/* Hidden file input for capturing or selecting an image */}
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  id={`capture-${index}`} // Assign a unique ID for each item
                  onChange={(e) => handleItemChange(index, e)}
                  className="hidden" // Hide the input field
                  capture="environment" // Use environment for rear camera or user for the front camera
                  multiple // Allow multiple image selection from the folder
                />

                {/* Camera icon button */}
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(`capture-${index}`).click()
                  } // Programmatically click the hidden file input
                  className="absolute top-2 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <FaCamera className="text-2xl" />
                </button>
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
                        src={
                          image.file
                            ? URL.createObjectURL(image.file)
                            : `${fileStorageUrl}` + image.url
                        } // Show existing image URL or newly selected file
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

              {/* Display captured or selected images */}
              {/* <div className="mt-2 flex flex-wrap">
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
              </div> */}

              {/* <div className="mt-2 flex flex-wrap">
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
              </div> */}
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
          Edit Booking
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default EditBooking;
