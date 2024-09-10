import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaTable, FaThLarge, FaPlus } from 'react-icons/fa';
import CardView from '../components/CardView.jsx';
import TableView from '../components/TableView.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const Home = () => {
  const [view, setView] = useState('card'); // 'card' or 'table'
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    axios.get('http://localhost:3030/booking')
      .then((response) => {
        setBookings(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(bookings);

  const handleRemove = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handleEdit = (id) => {
    // Implement edit logic here, e.g., redirect to an edit page
    alert(`Edit booking ${id}`);
  };



  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4 items-center">
        <div>
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
            onClick={() => setView('table')}
          >
            <FaTable className="inline-block mr-1" /> Table View
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={() => setView('card')}
          >
            <FaThLarge className="inline-block mr-1" /> Card View
          </button>
        </div>
        <Link to='/booking'
          className="px-4 py-2 bg-yellow-500 text-white rounded-md flex items-center"
         
        >
          <FaPlus className="inline-block mr-1" /> Add Booking
        </Link >
      </div>

      {view === 'table' ? (
        <TableView bookings={bookings} onRemove={handleRemove} onEdit={handleEdit} />
      ) : (
        <CardView bookings={bookings} onRemove={handleRemove} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default Home;
