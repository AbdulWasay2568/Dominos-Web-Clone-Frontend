import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  // Placeholder cart items
  const cartItems = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      quantity: 1,
      image: '/images/headphones.jpg',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 149.99,
      quantity: 2,
      image: '/images/watch.jpg',
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow p-4 rounded"
            >
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-gray-500 text-sm">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button>
                  <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
