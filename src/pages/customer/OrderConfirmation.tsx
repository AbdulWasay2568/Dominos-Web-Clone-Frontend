import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-20 text-center px-4">
      <CheckCircle className="mx-auto w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
      <p className="text-gray-600 mb-6">Your order has been placed successfully. We'll notify you when it's on the way.</p>
      <Link
        to="/orders"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default OrderConfirmation;
