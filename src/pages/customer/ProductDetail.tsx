import React from 'react';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../../components/customer/ProductImageGallery';
import AddToCartButton from '../../components/customer/AddToCartButton';

const ProductDetail: React.FC = () => {
  const { productId } = useParams();

  // Dummy product data
  const product = {
    id: productId,
    name: 'Wireless Headphones',
    price: 149.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    images: ['/placeholder.jpg', '/placeholder2.jpg'],
    rating: 4.5,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-10">
      <ProductImageGallery images={product.images} />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-indigo-600 font-semibold my-2">${product.price}</p>
        <p className="text-yellow-500">⭐ {product.rating} / 5</p>
        <p className="mt-4 text-gray-700">{product.description}</p>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;
