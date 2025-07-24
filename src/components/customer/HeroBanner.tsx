// src/components/home/HeroBanner.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
      <p className="text-lg mb-6">Discover the best deals on electronics, fashion, and more.</p>
      <Link
        to="/products/all"
        className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default HeroBanner;
