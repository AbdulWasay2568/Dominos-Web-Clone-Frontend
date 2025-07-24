// src/components/product/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="border rounded-lg overflow-hidden hover:shadow-md transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-bold">${product.price}</span>
          <span className="text-yellow-500 text-sm">★ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
