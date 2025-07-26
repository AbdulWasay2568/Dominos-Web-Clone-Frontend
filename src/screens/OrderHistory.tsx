import React, { useState } from "react";

interface Order {
  id: number;
  date: string;
  status: string;
  products: string[];
  total: number;
}

const allOrders: Order[] = [
  {
    id: 1,
    date: "2024-07-20",
    status: "Delivered",
    products: ["Pepperoni Pizza", "Coke"],
    total: 899,
  },
  {
    id: 2,
    date: "2024-07-18",
    status: "Pending",
    products: ["Cheese Pizza"],
    total: 699,
  },
  {
    id: 3,
    date: "2024-07-15",
    status: "Cancelled",
    products: ["BBQ Pizza", "Garlic Bread"],
    total: 1099,
  },
  {
    id: 4,
    date: "2024-07-10",
    status: "Preparing",
    products: ["Chicken Tikka Pizza"],
    total: 799,
  },
  // Add more orders as needed
];

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort logic
  const filteredOrders = allOrders
    .filter((order) => {
      if (statusFilter === "All") return true;
      return order.status === statusFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleReorder = (order: Order) => {
    alert(`Reordering: ${order.products.join(", ")}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border p-2 rounded"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-semibold">
                Order #{order.id} • {order.date}
              </p>
              <p className="text-gray-600">
                Status:{" "}
                <span
                  className={`font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-gray-800">Total: Rs. {order.total}</p>
              <p className="text-gray-700">
                Products: {order.products.join(", ")}
              </p>
            </div>

            <button
              onClick={() => handleReorder(order)}
              className="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Reorder
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
