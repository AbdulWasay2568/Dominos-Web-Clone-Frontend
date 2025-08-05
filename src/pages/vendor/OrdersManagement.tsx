import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  customerName: string;
  items: string[];
  total: number;
  status: "Pending" | "Preparing" | "Out for Delivery" | "Completed";
}

const dummyOrders: Order[] = [
  {
    id: 1,
    customerName: "John Doe",
    items: ["Pepperoni Pizza", "Coke"],
    total: 1499,
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    items: ["Veggie Pizza"],
    total: 999,
    status: "Preparing",
  },
];

const OrdersManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOrders(dummyOrders); // Replace with API call
  }, []);

  const updateStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
  };

  const filteredOrders = orders.filter((o) =>
    o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Orders Management</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                #{order.id} - {order.customerName}
              </h3>
              <span className="text-sm text-gray-500">
                Status: <span className="font-semibold">{order.status}</span>
              </span>
            </div>

            <div className="mb-2 text-sm">
              <p>Items: {order.items.join(", ")}</p>
              <p>Total: Rs {order.total.toLocaleString()}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Pending", "Preparing", "Out for Delivery", "Completed"]
                .filter((s) => s !== order.status)
                .map((s) => (
                  <button
                    key={s}
                    className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                    onClick={() => updateStatus(order.id, s as Order["status"])}
                  >
                    Mark as {s}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersManagement;
