import React from "react";

const stats = [
  { label: "Total Sales", value: "$4,230" },
  { label: "Orders", value: "128" },
  { label: "Products", value: "32" },
  { label: "Pending Orders", value: "5" },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white shadow-md p-4 rounded-xl text-center"
        >
          <h3 className="text-gray-500 text-sm">{stat.label}</h3>
          <p className="text-xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
