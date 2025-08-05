import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
  return (
    <>
      <NavBar />
      <Loader />
      <div className="p">
        <Outlet />
      </div>
    </>
  );
};

export default CustomerLayout;
