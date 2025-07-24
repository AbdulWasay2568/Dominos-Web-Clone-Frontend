import React from "react";
import VendorNavbar from "@/components/vendor/VendorNavbar";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import ProductTable from "@/components/vendor/ProductTable";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <VendorSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <VendorNavbar />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <button
            onClick={() => navigate("/vendor/add-product")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductManagement;
