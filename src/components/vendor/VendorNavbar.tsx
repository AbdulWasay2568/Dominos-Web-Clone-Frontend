import { useRouter } from 'next/router';

export const VendorNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token or auth state here
    router.push('/login');
  };

  return (
    <header className="ml-64 h-16 bg-white shadow px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">Vendor Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};
