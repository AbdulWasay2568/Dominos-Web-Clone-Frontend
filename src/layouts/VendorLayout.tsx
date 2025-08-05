import VendorSidebar from '../components/VendorSidebar';
import Loader from '../components/Loader';
import { Outlet } from 'react-router-dom';

const VendorLayout = () => {
  return (
    <div className="flex min-h-screen flex-row">
      <VendorSidebar />

      <div className="flex-1 flex flex-col">
        <Loader />
        <main className=" bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
