import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  { name: 'Dashboard', path: '/vendor/dashboard' },
  { name: 'Inventory', path: '/vendor/inventory' },
  { name: 'Orders', path: '/vendor/orders' },
  { name: 'Reviews', path: '/vendor/reviews' },
  { name: 'Profile', path: '/vendor/profile' },
  { name: 'Settings', path: '/vendor/settings' },
];

export const VendorSidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-5 space-y-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Vendor Panel</h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`px-3 py-2 rounded hover:bg-gray-700 ${
              router.pathname === item.path ? 'bg-gray-700 font-semibold' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
