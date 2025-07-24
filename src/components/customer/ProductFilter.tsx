import React from 'react';

const ProductFilter: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <select className="border px-3 py-2 rounded-md">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Books</option>
      </select>

      <select className="border px-3 py-2 rounded-md">
        <option>Sort by: Newest</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Rating</option>
      </select>
    </div>
  );
};

export default ProductFilter;
