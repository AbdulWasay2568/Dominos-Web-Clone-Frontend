import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // Dummy order details
  const items = [
    { name: 'Smart Watch', quantity: 1, price: 59.99 },
    { name: 'Bluetooth Speaker', quantity: 2, price: 29.75 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Order Details: {orderId}</h1>

      <div className="bg-white shadow rounded p-6 space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between border-b pb-2">
            <p>{item.name} x{item.quantity}</p>
            <p>${(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}

        <div className="flex justify-between font-semibold pt-4">
          <p>Total</p>
          <p>${items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
