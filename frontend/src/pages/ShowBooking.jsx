import { backEndUrl } from "../../config/envVars";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { formatDate } from "../../utils/DateConverter.js";
import axios from "axios";

const ShowBooking = () => {
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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold  text-gray-800">Show Booking</h1>
      </div>
      <div className=" flex justify-between items-center">
        <h1>Bill Number :{billNo} </h1>
        <h1>Customer : {customerName}</h1>
        <h1>Phone : {mobileNumber}</h1>
      </div>
      <div className="flex gap-8">
        <h1>Delivery Date : {deliveryDate}</h1>
        <h1> Attended Staff : {staffAttended}</h1>
      </div>
      {items.map((item) => {
           console.log(item);
        <div className="bg-black " key={item._id}>
          
 
    

        </div>;
      })}
    </div>
  );
};

export default ShowBooking;
