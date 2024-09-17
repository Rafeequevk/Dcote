import { FaEdit, FaTrashAlt, FaTable, FaThLarge, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardView = ({ bookings, onRemove, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white p-4 rounded-lg shadow-md relative"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Bill No: {booking.billNo}
            </h3>
            <div className=" flex justify-between">
              <Link
                to={`/booking/edit/${booking._id}`}
                className="text-blue-500 hover:text-blue-700 mr-4"
              >
                <FaEdit />
              </Link>
              <Link
                to={`/booking/delete/${booking._id}`}
                className="text-red-500 hover:text-red-700 mr-4"
              >
                <FaTrashAlt />
              </Link>
              <Link
                to={`/booking/details/${booking._id}`}
                className="text-xl text-green-500 hover:text-green-700 mr-4"
              >
                <FaEye />
              </Link>
            </div>
          </div>

          <p className="text-gray-600">Customer: {booking.customerName}</p>
          <p className="text-gray-600">Delivery Date: {booking.deliveryDate}</p>

          {/* Display Item Images */}
          <div className="flex flex-wrap mt-4 gap-2 ">
            {booking.items.map((item) => (
              <div key={item._id}>
                <h4 className="text-gray-700">{item.name}</h4>
                <div className="flex gap-2">
                  {item.imageUrl &&
                    item.imageUrl.map((image, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:3030${image}`} // Ensure correct image path
                        alt={`Image of ${item.name}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default CardView;
