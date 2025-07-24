import React from 'react';
import { Link } from 'react-router-dom';

interface WishlistItem {
  id: number;
  title: string;
  image: string;
  price: number;
}

const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    title: 'Noise Cancelling Headphones',
    image: 'https://via.placeholder.com/100',
    price: 149.99,
  },
  {
    id: 2,
    title: 'Portable Laptop Stand',
    image: 'https://via.placeholder.com/100',
    price: 39.99,
  },
];

const Wishlist: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white shadow p-4 rounded space-x-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
              <div className="space-x-2">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
                  Add to Cart
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
