import React from "react";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/vendor/VendorNavbar";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import OrderDetailCard from "@/components/vendor/OrderDetailCard";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex min-h-screen">
      <VendorSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <VendorNavbar />
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <OrderDetailCard orderId={id as string} />
      </div>
    </div>
  );
};

export default OrderDetail;
