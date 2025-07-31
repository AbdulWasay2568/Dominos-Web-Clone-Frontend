import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getOrdersByUserId } from "../redux/slices/order.slice";
import { Order } from "../interfaces/order.interfaces";

export default function OrderHistory() {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const user = useAppSelector((state) => state.auth.user);
  const orders = useAppSelector((state) => state.order.orders) as Order[];

  useEffect(() => {
  if (user && user.id) {
    dispatch(getOrdersByUserId(Number(user.id)));
  }
}, [dispatch, user]);


  // Filter and sort logic
  const filteredOrders = orders
    .filter((order) => {
      if (statusFilter === "All") return true;
      return order.status === statusFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
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
    // You can implement reorder logic here
    console.log("Reordering:", order.id);
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
            <option value="PENDING">Pending</option>
            <option value="PREPARING">Preparing</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
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
                Order #{order.id} • {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-600">
                Status:{" "}
                <span
                  className={`font-medium ${
                    order.status === "DELIVERED"
                      ? "text-green-600"
                      : order.status === "CANCELLED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-gray-800">Total: Rs. {order.totalAmount}</p>
              <p className="text-gray-700">
                Products:{" "}
                {order.orderItems
                  .map((item) => item.product?.name)
                  .filter(Boolean)
                  .join(", ")}
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
