import React, { useEffect, useRef, useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import BBQChicken from "../assets/Images/BBQChicken.jpg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/product.slice";

interface CardProps {
  scrollToCategory: string | null;
}

const Card: React.FC<CardProps> = ({ scrollToCategory }) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [hearts, setHearts] = useState<boolean[]>([]);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      setHearts(new Array(products.length).fill(false));
    }
  }, [products]);

  // Scroll to category when prop changes
  useEffect(() => {
    if (scrollToCategory && sectionRefs.current[scrollToCategory]) {
      sectionRefs.current[scrollToCategory]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollToCategory]);

  const toggleHeart = (index: number) => {
    const updated = [...hearts];
    updated[index] = !updated[index];
    setHearts(updated);
  };

  if (loading) return <div className="px-6 py-6">Loading...</div>;
  if (error) return <div className="px-6 py-6 text-red-600">{error}</div>;

  const categoryNames = Array.from(
    new Set(products.map((p) => p.category?.name).filter(Boolean))
  );

  return (
    <div className="px-6 py-6">
      {categoryNames.map((catName) => {
        const filteredProducts = products.filter((prod) => prod.category?.name === catName);
        if (filteredProducts.length === 0) return null;

        return (
          <div
            key={catName}
            ref={(el) => (sectionRefs.current[catName] = el)}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold underline mb-4 border-b pb-2">{catName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-pointer">
              {filteredProducts.map((prod) => {
                const globalIndex = products.findIndex((p) => p.id === prod.id);
                return (
                  <Link
                    to={`/product/${encodeURIComponent(prod.name)}`}
                    key={prod.id}
                    state={{ productId: prod.id }}

                    className="bg-white rounded-xl shadow hover:shadow-md border transition overflow-hidden block"
                  >
                    <div className="relative">
                      <img
                        src={BBQChicken}
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
                              toggleHeart(globalIndex);
                            }}
                            className="focus:outline-none"
                          >
                            {hearts[globalIndex] ? (
                              <FaHeart className="text-red-500 text-lg" />
                            ) : (
                              <FaRegHeart className="text-red-500 text-lg" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{prod.description}</p>
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
      })}
    </div>
  );
};

export default Card;
