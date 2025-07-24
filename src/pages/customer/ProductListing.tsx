import React from 'react';
import ProductCard from '../../components/customer/ProductCard';
import ProductFilter from '../../components/customer/ProductFilter';

const ProductListing: React.FC = () => {
  // Dummy product list
  const products = Array(8).fill({
    id: 1,
    name: 'Wireless Headphones',
    price: 149.99,
    imageUrl: 'https://unsplash.it/400/300?random=1',
    rating: 4.5,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <ProductFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
