import React, { useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";

import SuaceBoss from "../assets/Images/SauceBoss.jpg";
import CreamyTikka from "../assets/Images/CreamyTikka.jpg";
import BBQChicken from "../assets/Images/BBQChicken.jpg";

import PeriPeri from "../assets/Images/PeriPeri.jpg";
import LegendDynamite from "../assets/Images/LegendDynamite.jpg";
// import OnlyVeggie from "../assets/Images/OnlyVeggie.jpg";
import MushroomPepperoni from "../assets/Images/Mushroom&Pepperoni.jpg";
import SuperLoadedPeriPeri from "../assets/Images/SuperLoadedPeriPeri.jpg";
import HalfnHalf from "../assets/Images/HalfnHalf.jpg";
import { Link } from "react-router-dom";

// import ChickenWings from "../assets/Images/ChickenWings.jpg";
// import GarlicBread from "../assets/Images/GarlicBread.jpg";
// import MeltzDelight from "../assets/Images/MeltzDelight.jpg";
// import MeltzSupreme from "../assets/Images/MeltzSupreme.jpg";
// import ChocolateLavaCake from "../assets/Images/ChocolateLavaCake.jpg";
// import Pepsi from "../assets/Images/Pepsi.jpg";

// Full category list with subcategories
const categories = [
  { name: "Deals", subCategories: [ "WACKY WEDNESDAY", "MORE VALUE DEALS", "GATHERING DEALS", "DAILY DEALS" ] },
  { name: "Pizzas", subCategories: [ "CLASSIC FLAVORS", "FAVORITE FLAVORS", "PREMIUM FLAVORS", "SUPER LOADED PIZZAS", "HALF N HALF" ] },
  { name: "Pizza Rolls", subCategories: [ "LOADED PIZZA ROLLS" ] },
  { name: "Sides", subCategories: [ "CHICKEN CORNER", "FRIES", "BREADS", "DIPS" ] },
  { name: "Meltz", subCategories: [ "MELTZ FAVORITE", "MELTZ PREMIUM" ] },
  { name: "Desserts", subCategories: [ "DESSERTS" ] },
  { name: "Drinks", subCategories: [ "DRINKS" ] },
];

// Sample product list
const products = [
    // Pizzas
  {
    name: "Sauce Boss",
    description: "Secret Sauce Base, Mozzarella Cheese, Tex Mex Chicken...",
    price: 650,
    image: SuaceBoss,
    subCategory: "CLASSIC FLAVORS",
  },
  {
    name: "Creamy Tikka",
    description: "Cheese mayo base, mozzarella cheese, chicken tikka...",
    price: 650,
    image: CreamyTikka,
    subCategory: "CLASSIC FLAVORS",
  },
  {
    name: "BBQ Chicken",
    description: "BBQ sauce base, mozzarella cheese, spicy chicken...",
    price: 650,
    image: BBQChicken,
    subCategory: "CLASSIC FLAVORS",
  },
  {
    name: "Peri Peri",
    description: "BBQ sauce base, mozzarella cheese, spicy chicken...",
    price: 650,
    image: PeriPeri,
    subCategory: "FAVORITE FLAVORS",
  },
  {
    name: "Legend Dynamite",
    description: "BBQ sauce base, mozzarella cheese, spicy chicken...",
    price: 650,
    image: LegendDynamite,
    subCategory: "FAVORITE FLAVORS",
  },
  {
    name: "Mushroom & Pepperoni",
    description: "BBQ sauce base, mozzarella cheese, spicy chicken...",
    price: 650,
    image: MushroomPepperoni,
    subCategory: "PREMIUM FLAVORS",
  },
  {
    name: "Super Loaded Peri Peri",
    description: "BBQ sauce base, mozzarella cheese, spicy chicken...",
    price: 650,
    image: SuperLoadedPeriPeri,
    subCategory: "SUPER LOADED FLAVORS",
  },
  {
    name: "Half n Half",
    description: "BBQ sauce base, mozzarella cheese, spicy chicken...",
    price: 650,
    image: HalfnHalf,
    subCategory: "SUPER LOADED FLAVORS",
  },
  
  // Pizza Rolls
    {
        name: "Loaded Pizza Rolls",
        description: "Crispy rolls filled with cheese, chicken, and veggies...",
        price: 500,
        image: SuaceBoss,
        subCategory: "LOADED PIZZA ROLLS",
    },
    // Sides
    {
        name: "Chicken Wings",
        description: "Spicy chicken wings served with a tangy dip...",
        price: 400,
        image: CreamyTikka,
        subCategory: "CHICKEN CORNER",
    },
    {
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs...",
        price: 200,
        image: BBQChicken,
        subCategory: "BREADS",
    },
    // Meltz
    {
        name: "Meltz Delight",
        description: "Cheesy meltz with a blend of chicken and veggies...",
        price: 550,
        image: SuaceBoss,
        subCategory: "MELTZ FAVORITE",
    },
    {
        name: "Meltz Supreme",
        description: "Premium meltz with extra cheese and toppings...",
        price: 600,
        image: CreamyTikka,
        subCategory: "MELTZ PREMIUM",
    },
    // Desserts
    {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center...",
        price: 300,
        image: BBQChicken,
        subCategory: "DESSERTS",
    },
    // Drinks
    {
        name: "Coke",
        description: "Chilled Coca-Cola to refresh your meal...",
        price: 100,
        image: SuaceBoss,
        subCategory: "DRINKS",
    },
    
];

const Card: React.FC = () => {
  const allSubCategories = categories.flatMap((cat) => cat.subCategories);
  const [hearts, setHearts] = useState<boolean[]>(new Array(products.length).fill(false));

  const toggleHeart = (index: number) => {
    const updated = [...hearts];
    updated[index] = !updated[index];
    setHearts(updated);
  };


  return (
    <div className="px-6 py-6">
      {allSubCategories.map((subCat) => {
        const filteredProducts = products.filter((prod) => prod.subCategory === subCat);
        if (filteredProducts.length === 0) return null;

        return (
          <div key={subCat} className="mb-10">
            <h2 className="text-2xl font-bold underline mb-4 border-b pb-2">{subCat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-pointer">
              {filteredProducts.map((prod, idx) => (
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
                            e.preventDefault(); // prevent link navigation
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
                      From{" "}
                      <span className="text-blue-700 font-bold">Rs. {prod.price}</span>
                    </p>
                    <button className="mt-2 flex items-center gap-2 justify-center text-white bg-cyan-800 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-cyan-900">
                      <FaCartPlus />
                      Add To Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
