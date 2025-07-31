import React, { useState } from 'react';
import MyDetails from "../components/MyDetails";
import MyAddresses from "../components/MyAddresses";
import MyOrders from "../pages/OrderHistory";
import MyFavorites from "../pages/Favourites";

const ProfilePage = () => {
  const [selected, setSelected] = useState<string>('My Details');

  const navItems = [
    'My Details',
    'My Favorites',
    'My Addresses',
    'My Orders',
  ];

  const renderComponent = () => {
    switch (selected) {
      case 'My Details':
        return <MyDetails />;
      case 'My Favorites':
        return <MyFavorites />;
      case 'My Addresses':
        return <MyAddresses />;
      case 'My Orders':
        return <MyOrders />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md">
        <div className="p-6 text-xl font-semibold border-b text-gray-700">My Account</div>
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`text-left px-6 py-3 border-b transition-all font-medium ${
                selected === item
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white shadow-inner">
        {renderComponent()}
      </main>
    </div>
  );
};

export default ProfilePage;
