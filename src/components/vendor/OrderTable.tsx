import React from "react";

const sampleOrders = [
  {
    id: "ORD001",
    customer: "Ali Raza",
    date: "2025-07-21",
    total: "$199.99",
    status: "Processing",
  },
  {
    id: "ORD002",
    customer: "Sara Khan",
    date: "2025-07-20",
    total: "$59.99",
    status: "Shipped",
  },
];

const OrderTable = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="px-6 py-4">{order.id}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4">{order.total}</td>
              <td className="px-6 py-4">
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
