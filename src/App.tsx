import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./screens/Menu";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import OrderConfirmation from "./screens/OrderConfirmation";
import OrderTracking from "./screens/OrderTracking";
import OrderHistory from "./screens/OrderHistory";
import CustomerProfile from "./screens/CustomerProfile";
import Favorites from "./screens/Favourites";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import CustomerSupport from "./screens/CustomerSupport";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/product/:productName" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/customer-support" element={<CustomerSupport />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


      </Routes>
    </Router>
  );
};

export default App;
