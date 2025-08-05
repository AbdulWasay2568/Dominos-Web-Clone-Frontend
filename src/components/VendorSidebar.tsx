import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/auth.slice";

import {
  Home,
  List,
  Pizza,
  Layers,
  Users,
  BarChart2,
  Menu as MenuIcon,
  X as CloseIcon,
  User,
  LogOut
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", icon: Home, path: "/vendor/dashboard" },
  { name: "Profile", icon: User, path: "/vendor/profile" },
  { name: "Orders", icon: List, path: "/vendor/orders" },
  { name: "Menu", icon: Pizza, path: "/vendor/menu" },
  { name: "Categories", icon: Layers, path: "/vendor/categories" },
  { name: "Customers", icon: Users, path: "/vendor/customers" },
  { name: "Products", icon: BarChart2, path: "/vendor/products" },
];

const VendorSidebar = () => {
  const dispatch = useAppDispatch();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Topbar - Hamburger Only */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-md flex justify-start">
        <button onClick={toggleSidebar}>
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 min-h-screen bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-64`}
      >
        {/* Close icon for mobile inside sidebar */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 md:hidden">
          <span className="text-xl font-bold">🍕 Dominos Vendor</span>
          <button onClick={toggleSidebar}>
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar title (desktop) */}
        <div className="hidden md:block p-6 text-2xl font-bold border-b border-gray-800">
          🍕 Dominos Vendor
        </div>

        {/* Navigation links */}
        <nav className="mt-4 flex flex-col space-y-1">
          {navLinks.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center px-6 py-3 text-sm hover:bg-gray-800 transition-colors ${
                location.pathname === path ? "bg-gray-800 font-semibold" : ""
              }`}
              onClick={() => setIsOpen(false)} // close sidebar on mobile link click
            >
              <Icon className="w-5 h-5 mr-3" />
              {name}
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        <div className="mt-auto px-6 py-3 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default VendorSidebar;
