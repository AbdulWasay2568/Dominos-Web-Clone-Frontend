import React, { useEffect } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addFavourite,
  removeFavourite,
  getFavouritesByUserId,
} from "../../redux/slices/favourites.slice";

import { getAllProducts } from "../../redux/slices/product.slice";

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const { favourites } = useAppSelector((state) => state.favourites);
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (user) {
      dispatch(getFavouritesByUserId(Number(user.id)));
    }
    dispatch(getAllProducts());
  }, [dispatch, user]);

  const toggleFavourite = (productId: number) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const isFav = favourites.some(
      (f) => f.productId === productId && f.userId === Number(user.id)
    );
    if (isFav) {
      const favToRemove = favourites.find(
        (f) => f.productId === productId && f.userId === Number(user.id)
      );
      if (favToRemove) dispatch(removeFavourite(favToRemove.id));
    } else {
      dispatch(addFavourite({ userId: Number(user.id), productId }));
    }
  };

  // Match product data from favourites
  const favouriteProducts = favourites
    .map((fav) => products.find((p) => p.id === fav.productId))
    .filter((p) => p !== undefined);

  return (
    <div className="px-6 py-6">
      <h2 className="text-2xl font-bold underline mb-4 border-b pb-2">Your Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 cursor-pointer">
        {favouriteProducts.map((prod) => {
          if (!prod) return null;
          return (
            <Link
              to={`/product/${encodeURIComponent(prod.name)}`}
              key={prod.id}
              className="bg-white rounded-xl shadow hover:shadow-md border transition overflow-hidden block"
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
                    <h3 className="font-semibold text-sm">{prod.name}</h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavourite(prod.id);
                      }}
                      className="focus:outline-none"
                    >
                      <FaHeart className="text-red-500 text-lg" />
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
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
