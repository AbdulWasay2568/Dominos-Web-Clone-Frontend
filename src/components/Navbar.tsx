import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          ShopEase
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/products" className="hover:text-indigo-600">Shop</Link>
          <Link to="/categories" className="hover:text-indigo-600">Categories</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex space-x-4 items-center">
          <Link to="/wishlist"><Heart className="w-5 h-5 hover:text-pink-600" /></Link>
          <Link to="/cart"><ShoppingCart className="w-5 h-5 hover:text-indigo-600" /></Link>
          <Link to="/account"><User className="w-5 h-5 hover:text-indigo-600" /></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
