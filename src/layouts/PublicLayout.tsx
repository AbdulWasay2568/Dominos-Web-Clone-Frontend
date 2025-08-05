import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <NavBar />
      <Loader />
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default PublicLayout;
