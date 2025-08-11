// src/pages/vendor/ProductEditWrapper.tsx

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductForm from "./ProductsForm";

const ProductEditWrapper: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const state = location.state as {
    product: any;
  };

  if (!state?.product || !id) {
    return <div className="text-red-600 p-4">Invalid product edit request</div>;
  }

  const product = state.product;

  const initialData = {
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.category?.id,
    addons: product.addons || [],
    imageUrl: product.imageUrl || "",
  };

  return (
    <ProductForm
      editMode={true}
      productId={parseInt(id)}
      initialData={initialData}
    />
  );
};

export default ProductEditWrapper;
