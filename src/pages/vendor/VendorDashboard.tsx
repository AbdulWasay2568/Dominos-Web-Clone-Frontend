import React from "react";
import { ArrowUpRight, ShoppingCart, DollarSign, Pizza, Users } from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "1,245",
    icon: <ShoppingCart className="text-white" />,
    change: "+8.2%",
    color: "bg-indigo-600",
  },
  {
    title: "Total Revenue",
    value: "$18,230",
    icon: <DollarSign className="text-white" />,
    change: "+5.1%",
    color: "bg-green-600",
  },
  {
    title: "Top Selling",
    value: "Pepperoni Pizza",
    icon: <Pizza className="text-white" />,
    change: "↑",
    color: "bg-yellow-500",
  },
  {
    title: "New Customers",
    value: "154",
    icon: <Users className="text-white" />,
    change: "+12%",
    color: "bg-purple-600",
  },
];

const recentOrders = [
  { id: "#1001", customer: "John Doe", amount: "$24.99", status: "Preparing" },
  { id: "#1002", customer: "Sarah Ali", amount: "$39.49", status: "Delivered" },
  { id: "#1003", customer: "Ahmed Raza", amount: "$12.99", status: "Pending" },
];

const VendorDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className={`p-5 rounded-2xl shadow-md text-white ${stat.color}`}>
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">{stat.title}</div>
              <div className="p-2 bg-white/20 rounded-full">{stat.icon}</div>
            </div>
            <div className="text-3xl font-bold mt-4">{stat.value}</div>
            <div className="text-sm mt-1 opacity-80 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500">
          Chart component (e.g., Recharts or Chart.js) goes here
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b text-sm">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Preparing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;
