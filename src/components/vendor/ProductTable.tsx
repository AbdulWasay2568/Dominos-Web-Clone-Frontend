import React from "react";

const sampleProducts = [
  {
    id: "1",
    name: "Blue Sneakers",
    price: "$49.99",
    stock: 20,
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: "$79.99",
    stock: 10,
  },
];

const ProductTable = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Stock</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sampleProducts.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4 space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
