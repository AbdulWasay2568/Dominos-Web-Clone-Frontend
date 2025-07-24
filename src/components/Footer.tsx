import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ShopEase */}
        <div>
          <h2 className="text-xl font-bold mb-3">ShopEase</h2>
          <p className="text-sm text-gray-400">Your one-stop shop for everything awesome.</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/products" className="hover:text-white">Shop</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/account" className="hover:text-white">My Account</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">support@shopease.com</p>
          <p className="text-sm text-gray-400 mt-1">+92 300 1234567</p>
        </div>
      </div>

      <div className="text-center py-4 text-sm text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
