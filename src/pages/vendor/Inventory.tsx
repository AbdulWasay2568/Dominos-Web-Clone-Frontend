import React from "react";

const mockInventory = [
  { id: "P001", name: "Shirt", stock: 20, price: "$39.99" },
  { id: "P002", name: "Shoes", stock: 5, price: "$99.99" },
  { id: "P003", name: "Hat", stock: 0, price: "$19.99" },
];

const Inventory = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Product ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Stock</th>
            <th className="px-6 py-3 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {mockInventory.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className={`px-6 py-4 ${item.stock === 0 ? 'text-red-500' : ''}`}>{item.stock}</td>
              <td className="px-6 py-4">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
