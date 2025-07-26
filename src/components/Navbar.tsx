import React, { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  subCategories?: SubCategory[];
}

const categories: Category[] = [
  {
    name: "Deals",
    subCategories: [
      { name: "WACKY WEDNESDAY", href: "#" },
      { name: "MORE VALUE DEALS", href: "#" },
      { name: "GATHERING DEALS", href: "#" },
      { name: "DAILY DEALS", href: "#" },
    ],
  },
  {
    name: "Pizzas",
    subCategories: [
      { name: "CLASSIC FLAVORS", href: "#" },
      { name: "FAVORITE FLAVORS", href: "#" },
      { name: "PREMIUM FLAVORS", href: "#" },
      { name: "SUPER LOADED PIZZAS", href: "#" },
      { name: "HALF N HALF", href: "#" },
    ],
  },
  {
    name: "Pizza Rolls",
    subCategories: [{ name: "LOADED PIZZA ROLLS", href: "#" }],
  },
  {
    name: "Sides",
    subCategories: [
      { name: "CHICKEN CORNER", href: "#" },
      { name: "FRIES", href: "#" },
      { name: "BREADS", href: "#" },
      { name: "DIPS", href: "#" },
    ],
  },
  {
    name: "Meltz",
    subCategories: [
      { name: "MELTZ FAVORITE", href: "#" },
      { name: "MELTZ PREMIUM", href: "#" },
    ],
  },
  {
    name: "Desserts",
    subCategories: [{ name: "DESSERTS", href: "#" }],
  },
  {
    name: "Drinks",
    subCategories: [{ name: "DRINKS", href: "#" }],
  },
];

const Navbar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>("Deals");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const currentCategory = categories.find(cat => cat.name === activeCategory);

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
      <div className="bg-gray-800  text-white px-6 py-2 relative">
        <div className="flex justify-center items-center gap-6 font-semibold items-center">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                setActiveSubCategory(null);
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

        {/* Subcategories Row */}
        {currentCategory?.subCategories?.length && (
          <div className="flex justify-center items-center  gap-4 font-normal text-sm mt-2">
            {currentCategory.subCategories.map((sub) => (
              <span
                key={sub.name}
                onClick={() => setActiveSubCategory(sub.name)}
                className={`cursor-pointer px-2 py-1 rounded ${
                  activeSubCategory === sub.name
                    ? "bg-red-600 text-white"
                    : "hover:underline"
                }`}
              >
                {sub.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
