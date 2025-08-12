import React, { useEffect, useRef } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/product.slice";
import {
  addFavourite,
  removeFavourite,
} from "../redux/slices/favourites.slice";

interface CardProps {
  scrollToCategory: string | null;
}

const Card: React.FC<CardProps> = ({ scrollToCategory }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { products, error } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.auth);
  const { favourites } = useAppSelector((state) => state.favourites);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (
      scrollToCategory &&
      sectionRefs.current[scrollToCategory]
    ) {
      sectionRefs.current[scrollToCategory]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [scrollToCategory]);

  const toggleHeart = (productId: number) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const isFavourite = favourites.some(
      (fav) =>
        fav.productId === productId && fav.userId === Number(user.id)
    );

    if (isFavourite) {
      const favToRemove = favourites.find(
        (fav) =>
          fav.productId === productId &&
          fav.userId === Number(user.id)
      );
      if (favToRemove) {
        dispatch(removeFavourite(favToRemove.id));
      }
    } else {
      dispatch(
        addFavourite({
          userId: Number(user.id),
          productId: productId,
        })
      );
    }
  };

  if (error)
    return <div className="px-6 py-6 text-red-600">{error}</div>;

  const categoryNames = Array.from(
    new Set(
      products
        .map((p) => p.category?.name)
        .filter(Boolean) as string[]
    )
  );

  return (
    <div className="px-6 py-6">
      {categoryNames.map((catName) => {
        const filteredProducts = products.filter(
          (prod) => prod.category?.name === catName
        );
        if (filteredProducts.length === 0) return null;

        return (
          <div
            key={catName}
            ref={(el) => (sectionRefs.current[catName] = el)}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold underline mb-4 border-b pb-2">
              {catName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-pointer">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl shadow hover:shadow-md border transition overflow-hidden block"
                >
                  <Link
                    to={`/product/${encodeURIComponent(prod.name)}`}
                    state={{ productId: prod.id }}
                  >
                    <div className="relative">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-full h-52 object-cover"
                      />
                    </div>
                  

                  <div className="p-4 flex flex-col justify-between h-[180px]">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">
                          {prod.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => toggleHeart(prod.id)}
                          className="text-red-500"
                        >
                          {favourites.some(
                            (f) =>
                              f.productId === prod.id &&
                              f.userId === Number(user?.id)
                          ) ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                    <p className="text-sm">
                      From{" "}
                      <span className="text-blue-700 font-bold">
                        Rs. {prod.price}
                      </span>
                    </p>
                    <button className="mt-2 flex items-center gap-2 justify-center text-white bg-cyan-800 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-cyan-900">
                      <FaCartPlus />
                      Add To Cart
                    </button>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
