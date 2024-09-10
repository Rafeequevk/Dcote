import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const TableView = ({ bookings, onRemove, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
              Bill No
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
              Customer Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
              Delivery Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm leading-4 text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="px-6 py-4 border-b border-gray-300 text-sm">
                {booking.billNo}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm">
                {booking.customerName}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm">
                {booking.deliveryDate}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-right text-sm  ">
                <div className="flex justify-between items-center">
                  <Link
                    to={`booking/edit/${booking._id}`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    <FaEdit />
                  </Link>
                  <Link
                    to={`booking/delete/${booking._id}`}
                    className="text-red-500 hover:text-red-700 mr-4"
                  >
                    <FaTrashAlt />
                  </Link>
                  <Link
                    to={`/booking/details/${booking._id}`}
                    className="text-lg text-green-500 hover:text-green-700 "
                  >
                    <FaEye />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableView;
