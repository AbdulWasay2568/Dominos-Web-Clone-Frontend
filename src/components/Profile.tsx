import { useState } from 'react';
import { Menu } from 'lucide-react'; // for hamburger icon
import MyDetails from "../components/MyDetails";
import MyAddresses from "../components/MyAddresses";
import MyOrders from "../pages/OrderHistory";
import MyFavorites from "../pages/Favourites";

const ProfilePage = () => {
  const [selected, setSelected] = useState<string>('My Details');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col md:flex-row">
      {/* Top Navbar (Mobile) */}
      <header className="flex items-center justify-between md:hidden bg-white px-4 py-3 shadow">
        <div className="text-xl font-semibold">My Account</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`bg-white border-r shadow-md w-full md:w-64 z-10 md:static fixed top-0 left-0  transition-transform transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 text-xl font-semibold border-b text-gray-700 hidden md:block">My Account</div>
        <nav className="flex flex-col mt-3 md:mt-0">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelected(item);
                setSidebarOpen(false); // close sidebar on mobile after selecting
              }}
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
      <main className="flex-1 p-6 md:p-8 bg-white shadow-inner mt-2 md:mt-0">
        {renderComponent()}
      </main>
    </div>
  );
};

export default ProfilePage;
