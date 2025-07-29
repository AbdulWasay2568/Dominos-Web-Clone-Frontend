import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllCategories } from "../redux/slices/category.slice";

interface NavbarProps {
  onCategoryClick: (categoryName: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>("Pizzas");

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <nav className="bg-white border-b shadow-sm text-sm">
      {/* Top Row */}
      <div className="flex justify-between items-center px-6 py-2">
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

        <div className="hidden lg:flex gap-8 font-semibold text-black">
          <span className="hover:text-blue-700 cursor-pointer">MENU</span>
          <span className="hover:text-blue-700 cursor-pointer">STORES</span>
          <span className="hover:text-blue-700 cursor-pointer">OUR APPS</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaUserCircle className="text-xl" />
            <span className="font-semibold">MY ACCOUNT</span>
          </div>
        </div>
      </div>

      {/* Category Row */}
      <div className="bg-gray-800 text-white px-6 py-2 relative">
        <div className="flex justify-center gap-6 font-semibold">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                onCategoryClick(category.name);
              }}
              className="relative cursor-pointer"
            >
              <span
                className={`px-2 py-1 rounded-t-md ${
                  activeCategory === category.name ? "bg-gray-700" : ""
                }`}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
