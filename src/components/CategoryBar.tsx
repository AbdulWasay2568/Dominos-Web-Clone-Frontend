import React, { useEffect, useState } from "react";
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
