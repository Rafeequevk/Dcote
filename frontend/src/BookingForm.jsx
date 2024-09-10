// import React, { useState } from 'react';
// import axios from 'axios';

// const BookingForm = () => {
//   const [billNo, setBillNo] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [deliveryDate, setDeliveryDate] = useState('');
//   const [staffAttended, setstaffAttended ]  = useState('')
//   const [items, setItems] = useState([{ name: '', quantity: 1, price: 0, images: [] }]);
//   const [message, setMessage] = useState('');

//   const handleItemChange = (index, event) => {
//     const values = [...items];
//     if (event.target.name === "images") {  // Corrected to "images"
//       values[index][event.target.name] = [...event.target.files];
//     } else {
//       values[index][event.target.name] = event.target.value;
//     }
//     setItems(values);
//   };

//   const addItem = () => {
//     setItems([...items, { name: '', quantity: 1, price: 0, images: [] }]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('billNo', billNo);
//     formData.append('customerName', customerName);
//     formData.append('mobileNumber', mobileNumber);
//     formData.append('deliveryDate', deliveryDate);
//     formData.append('staffAttended',staffAttended)

//     items.forEach((item, index) => {
//       formData.append(`items[${index}][name]`, item.name);
//       formData.append(`items[${index}][quantity]`, item.quantity);
//       formData.append(`items[${index}][price]`, item.price);
//       item.images.forEach(image => {
//         formData.append(`images`, image);  // Corrected to "images"
//       });
//     });

//     try {
//       const response = await axios.post('http://localhost:3030/booking', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error creating booking');
//     }
//   };

//   return (

//     <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//   <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Booking</h1>
//   <form onSubmit={handleSubmit} className="space-y-6">
//     <div className="flex flex-col space-y-1">
//       <label className="text-gray-700 font-semibold">Bill No:</label>
//       <div className="relative">
//         <input
//           type="text"
//           value={billNo}
//           onChange={(e) => setBillNo(e.target.value)}
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <span className="absolute top-2 right-3 text-gray-400">
//           <i className="fas fa-file-invoice-dollar"></i>
//         </span>
//       </div>
//     </div>

//     <div className="flex flex-col space-y-1">
//       <label className="text-gray-700 font-semibold">Customer Name:</label>
//       <div className="relative">
//         <input
//           type="text"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <span className="absolute top-2 right-3 text-gray-400">
//           <i className="fas fa-user"></i>
//         </span>
//       </div>
//     </div>

//     <div className="flex flex-col space-y-1">
//       <label className="text-gray-700 font-semibold">Mobile Number:</label>
//       <div className="relative">
//         <input
//           type="text"
//           value={mobileNumber}
//           onChange={(e) => setMobileNumber(e.target.value)}
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <span className="absolute top-2 right-3 text-gray-400">
//           <i className="fas fa-phone-alt"></i>
//         </span>
//       </div>
//     </div>

//     <div className="flex flex-col space-y-1">
//       <label className="text-gray-700 font-semibold">Delivery Date:</label>
//       <div className="relative">
//         <input
//           type="date"
//           value={deliveryDate}
//           onChange={(e) => setDeliveryDate(e.target.value)}
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <span className="absolute top-2 right-3 text-gray-400">
//           <i className="fas fa-calendar-alt"></i>
//         </span>
//       </div>
//     </div>

//     <div className="flex flex-col space-y-1">
//       <label className="text-gray-700 font-semibold">staff Attended</label>
//       <div className="relative">
//         <input
//           type="text"
//           value={staffAttended}
//           onChange={(e) => setstaffAttended(e.target.value)}
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <span className="absolute top-2 right-3 text-gray-400">
//           <i className="fas fa-calendar-alt"></i>
//         </span>
//       </div>
//     </div>

//     <h2 className="text-xl font-semibold mt-8 text-gray-700">Items</h2>
//     {items.map((item, index) => (
//       <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
//         <div className="flex flex-col space-y-1">
//           <label className="text-gray-700 font-semibold">Item Name:</label>
//           <div className="relative">
//             <input
//               type="text"
//               name="name"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, e)}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="absolute top-2 right-3 text-gray-400">
//               <i className="fas fa-tag"></i>
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-1">
//           <label className="text-gray-700 font-semibold">Quantity:</label>
//           <div className="relative">
//             <input
//               type="number"
//               name="quantity"
//               value={item.quantity}
//               onChange={(e) => handleItemChange(index, e)}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="absolute top-2 right-3 text-gray-400">
//               <i className="fas fa-sort-numeric-up-alt"></i>
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-1">
//           <label className="text-gray-700 font-semibold">Price:</label>
//           <div className="relative">
//             <input
//               type="number"
//               name="price"
//               value={item.price}
//               onChange={(e) => handleItemChange(index, e)}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="absolute top-2 right-3 text-gray-400">
//               <i className="fas fa-dollar-sign"></i>
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-1">
//           <label className="text-gray-700 font-semibold">Images:</label>
//           <div className="relative">
//             <input
//               type="file"
//               name="images"
//               multiple
//               onChange={(e) => handleItemChange(index, e)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="absolute top-2 right-3 text-gray-400">
//               <i className="fas fa-images"></i>
//             </span>
//           </div>
//         </div>
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={addItem}
//       className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//     >
//       <i className="fas fa-plus mr-2"></i>Add Another Item
//     </button>

//     <button
//       type="submit"
//       className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
//     >
//       <i className="fas fa-check-circle mr-2"></i>Create Booking
//     </button>
//   </form>
//   {message && <p className="mt-4 text-green-600">{message}</p>}
// </div>

    
//     // <div>
//     //   <h1>Create Booking</h1>
//     //   <form onSubmit={handleSubmit}>
//     //     <div>
//     //       <label>Bill No:</label>
//     //       <input type="text" value={billNo} onChange={(e) => setBillNo(e.target.value)} required />
//     //     </div>
//     //     <div>
//     //       <label>Customer Name:</label>
//     //       <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
//     //     </div>
//     //     <div>
//     //       <label>Mobile Number:</label>
//     //       <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
//     //     </div>
//     //     <div>
//     //       <label>Delivery Date:</label>
//     //       <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required />
//     //     </div>

//     //     <h2>Items</h2>
//     //     {items.map((item, index) => (
//     //       <div key={index}>
//     //         <div>
//     //           <label>Item Name:</label>
//     //           <input type="text" name="name" value={item.name} onChange={(e) => handleItemChange(index, e)} required />
//     //         </div>
//     //         <div>
//     //           <label>Quantity:</label>
//     //           <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} required />
//     //         </div>
//     //         <div>
//     //           <label>Price:</label>
//     //           <input type="number" name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} required />
//     //         </div>
//     //         <div>
//     //           <label>Images:</label>
//     //           <input type="file" name="images" multiple onChange={(e) => handleItemChange(index, e)} />  {/* Corrected to "images" */}
//     //         </div>
//     //       </div>
//     //     ))}
//     //     <button type="button" onClick={addItem}>Add Another Item</button>

//     //     <button type="submit">Create Booking</button>
//     //   </form>
//     //   {message && <p>{message}</p>}
//     // </div>
//   );
// };

// export default BookingForm;


import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [billNo, setBillNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [staffAttended, setStaffAttended] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0, images: [] }]);
  const [message, setMessage] = useState('');

  const handleItemChange = (index, event) => {
    const values = [...items];
    if (event.target.name === 'images') {
      values[index][event.target.name] = [...event.target.files];
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setItems(values);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0, images: [] }]);
  };

  const removeItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('billNo', billNo);
    formData.append('customerName', customerName);
    formData.append('mobileNumber', mobileNumber);
    formData.append('deliveryDate', deliveryDate);
    formData.append('staffAttended', staffAttended);

    items.forEach((item, index) => {
      formData.append(`items[${index}][name]`, item.name);
      formData.append(`items[${index}][quantity]`, item.quantity);
      formData.append(`items[${index}][price]`, item.price);
      item.images.forEach((image) => {
        formData.append('images', image);
      });
    });

    try {
      const response = await axios.post('http://localhost:3030/booking', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error creating booking');
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

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Booking</h1>
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
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
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
  <div className="mt-2 flex flex-wrap">
    {item.images.length > 0 &&
      Array.from(item.images).map((image, imgIndex) => (
        <img
          key={imgIndex}
          src={URL.createObjectURL(image)}
          alt={`Preview ${imgIndex + 1}`}
          className="w-24 h-24 object-cover rounded-md mr-2 mb-2"
        />
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

export default BookingForm;
