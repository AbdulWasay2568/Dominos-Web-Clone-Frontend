import React, { useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import SuaceBoss from "../assets/Images/SauceBoss.jpg";
import CreamyTikka from "../assets/Images/CreamyTikka.jpg";
import BBQChicken from "../assets/Images/BBQChicken.jpg";
import PeriPeri from "../assets/Images/PeriPeri.jpg";
import LegendDynamite from "../assets/Images/LegendDynamite.jpg";
import MushroomPepperoni from "../assets/Images/Mushroom&Pepperoni.jpg";
import SuperLoadedPeriPeri from "../assets/Images/SuperLoadedPeriPeri.jpg";
import HalfnHalf from "../assets/Images/HalfnHalf.jpg";

const products = [
  { name: "Sauce Boss", description: "Secret Sauce Base, Mozzarella Cheese, Tex Mex Chicken...", price: 650, image: SuaceBoss },
  { name: "Creamy Tikka", description: "Cheese mayo base, mozzarella cheese, chicken tikka...", price: 650, image: CreamyTikka },
  { name: "BBQ Chicken", description: "BBQ sauce base, mozzarella cheese, spicy chicken...", price: 650, image: BBQChicken },
  { name: "Peri Peri", description: "BBQ sauce base, mozzarella cheese, spicy chicken...", price: 650, image: PeriPeri },
  { name: "Legend Dynamite", description: "BBQ sauce base, mozzarella cheese, spicy chicken...", price: 650, image: LegendDynamite },
  { name: "Mushroom & Pepperoni", description: "BBQ sauce base, mozzarella cheese, spicy chicken...", price: 650, image: MushroomPepperoni },
  { name: "Super Loaded Peri Peri", description: "BBQ sauce base, mozzarella cheese, spicy chicken...", price: 650, image: SuperLoadedPeriPeri },
  { name: "Half n Half", description: "BBQ sauce base, mozzarella cheese, spicy chicken...", price: 650, image: HalfnHalf },
];

const Favorites: React.FC = () => {
  const [hearts, setHearts] = useState<boolean[]>(new Array(products.length).fill(true));

  const toggleHeart = (index: number) => {
    const updated = [...hearts];
    updated[index] = !updated[index];
    setHearts(updated);
  };

  return (
    <div className="px-6 py-6">
      <h2 className="text-2xl font-bold underline mb-4 border-b pb-2">Your Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-pointer">
        {products.map((prod, idx) => {
          if (!hearts[idx]) return null;
          return (
            <Link
              to={`/product/${encodeURIComponent(prod.name)}`}
              key={prod.name}
              className="bg-white rounded-xl shadow hover:shadow-md border transition overflow-hidden block"
            >
              <div className="relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-52 object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-[180px]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{prod.name}</h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleHeart(idx);
                      }}
                      className="focus:outline-none"
                    >
                      {hearts[idx] ? (
                        <FaHeart className="text-red-500 text-lg" />
                      ) : (
                        <FaRegHeart className="text-red-500 text-lg" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {prod.description}
                  </p>
                </div>
                <p className="text-sm">
                  From <span className="text-blue-700 font-bold">Rs. {prod.price}</span>
                </p>
                <button className="mt-2 flex items-center gap-2 justify-center text-white bg-cyan-800 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-cyan-900">
                  <FaCartPlus />
                  Add To Cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
