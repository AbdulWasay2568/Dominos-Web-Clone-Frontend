import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import VendorLayout from "./layouts/VendorLayout";

// Public Pages
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

// Customer Pages
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderConfirmation from "./pages/customer/OrderConfirmation";
import OrderTracking from "./pages/customer/OrderTracking";
import OrderHistory from "./pages/customer/OrderHistory";
import Favorites from "./pages/customer/Favourites";
import CustomerSupport from "./pages/customer/CustomerSupport";
import ProfilePage from "./components/Profile";

import Profile from "./components/MyDetails"

// Vendor Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import CategoryManagement from "./pages/vendor/CategoryManagement";
import MenuManagement from "./pages/vendor/MenuManagement";
import OrdersManagement from "./pages/vendor/OrdersManagement";
import Notifications from "./pages/vendor/Notifications";

import ProductsPage from "./pages/vendor/Products";
import ProductsForm from "./pages/vendor/ProductsForm"
import ProductEditWrapper from "./pages/vendor/ProductEditWrapper";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Customer Layout */}
        <Route element={<CustomerLayout />}>
          <Route path="/product/:productName" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Vendor Layout */}
        <Route element={<VendorLayout />}>
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/profile" element={<Profile />} />
          <Route path="/vendor/categories" element={<CategoryManagement />} />
          <Route path="/vendor/menu" element={<MenuManagement />} />
          <Route path="/vendor/orders" element={<OrdersManagement />} />
          <Route path="/vendor/notifications" element={<Notifications />} />

          <Route path="/vendor/products" element={<ProductsPage />} />
          <Route path="/vendor/products/:id/edit" element={<ProductEditWrapper />} />
          <Route path="/vendor/products/new" element={<ProductsForm />} />


        </Route>
      </Routes>
    </Router>
  );
};

export default App;
