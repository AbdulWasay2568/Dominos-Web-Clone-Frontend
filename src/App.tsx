import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import ProductListing from './pages/customer/ProductListing';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderConfirmation from './pages/customer/OrderConfirmation';
import Orders from './pages/customer/Orders';
import OrderDetail from './pages/customer/OrderDetail';
import Wishlist from './pages/customer/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/customer/Profile';
import Addresses from './pages/customer/Addresses';
import Contact from './pages/customer/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import ProtectedRoute from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/contact" element={<Contact />} />

{/*
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/order/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/review/:productId" element={<ProtectedRoute><Review /></ProtectedRoute>} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
