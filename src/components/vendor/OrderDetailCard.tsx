import React from "react";

interface Props {
  orderId: string;
}

const OrderDetailCard: React.FC<Props> = ({ orderId }) => {
  const order = {
    id: orderId,
    customer: "Ali Raza",
    date: "2025-07-21",
    total: "$199.99",
    status: "Processing",
    items: [
      { name: "Shirt", qty: 2, price: "$49.99" },
      { name: "Shoes", qty: 1, price: "$99.99" },
    ],
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Date:</strong> {order.date}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> {order.total}</p>
      <h3 className="mt-4 font-semibold">Items</h3>
      <ul className="mt-2">
        {order.items.map((item, i) => (
          <li key={i} className="border-b py-2 flex justify-between">
            <span>{item.name} x {item.qty}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailCard;
