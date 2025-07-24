import React from 'react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

const dummyOrders: Order[] = [
  { id: 'ORD-1001', date: '2025-07-20', status: 'Shipped', total: 119.99 },
  { id: 'ORD-1002', date: '2025-07-15', status: 'Delivered', total: 89.49 },
];

const Orders: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="bg-white shadow rounded">
        {dummyOrders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center border-b p-4"
          >
            <div>
              <p className="font-semibold">{order.id}</p>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">{order.status}</p>
              <p className="font-bold">${order.total.toFixed(2)}</p>
              <Link
                to={`/orders/${order.id}`}
                className="text-indigo-600 text-sm underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
