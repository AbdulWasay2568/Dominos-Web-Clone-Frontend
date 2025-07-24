import React from "react";
import VendorNavbar from "@/components/vendor/VendorNavbar";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import OrderTable from "@/components/vendor/OrderTable";

const VendorOrders = () => {
  return (
    <div className="flex min-h-screen">
      <VendorSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <VendorNavbar />
        <h1 className="text-2xl font-bold mb-4">Customer Orders</h1>
        <OrderTable />
      </div>
    </div>
  );
};

export default VendorOrders;
