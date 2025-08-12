import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/auth.slice";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const user = useAppSelector((state) => state.user.currentUser)
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    setShowModal(false);
    navigate("/");
  };

  const handleAccountClick = () => {
    if(!authUser){
      navigate("/login");
    }
    setShowModal((prev) => !prev);
  };

  const handleMyAccount = () => {
    setShowModal(false);
    navigate("/profile");
  };

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm text-sm relative">
      <div className="flex justify-between items-center px-6 py-2">
        {/* Logo & Location */}
        <div className="flex items-center gap-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg"
            alt="Domino's"
            className="h-6"
          />
          <span className="text-xs font-medium text-gray-700">
            Delivering to <br />
            <span className="font-bold uppercase text-sm text-black">West ⌄</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex gap-8 font-semibold text-black">
          <Link to="/" className="hover:text-blue-700 cursor-pointer">MENU</Link>
          <span className="hover:text-blue-700 cursor-pointer">STORES</span>
          <span className="hover:text-blue-700 cursor-pointer">OUR APPS</span>
        </div>

        {/* Cart & Account */}
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <Link to="/cart">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1 cursor-pointer" onClick={handleAccountClick}>
            <FaUserCircle className="text-xl" />
            <span className="font-semibold">{user?.name ?? 'My Account'}</span>
          </div>

          {/* Modal Dropdown */}
          {showModal && (
            <div
              ref={modalRef}
              className="absolute top-12 right-0 bg-white shadow-lg border rounded-md text-black w-40 z-50"
            >
              {authUser ? (
                <>
                  <button
                    onClick={handleMyAccount}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : null
              }
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
