import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCartByUserId } from "../../redux/slices/cart.slice";
import { editCartItem, removeCartItem } from "../../redux/slices/cartItem.slice"
import { CartItem } from "../../interfaces/cartItem.interface";
import OrderSummary from "../../components/OrderSummary";

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const currentCart = useAppSelector((state) => state.cart.currentCart);

  useEffect(() => {
    dispatch(getCartByUserId(Number(user?.id)));
  }, [dispatch, user, navigate]);


  const cartItems = currentCart?.cartItems || [];

  const getItemTotal = (item: CartItem) => {
    const addOnTotal =
      item.addonOptions?.reduce((sum, a) => sum + a.additionalPrice, 0) || 0;
    return addOnTotal * item.quantity;
  };

  const total = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  const deliveryCharge = 129;
  const posFee = 0;
  const discount = 0;
  const grandTotal = total + deliveryCharge + posFee - discount;



  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.product?.imageUrl}
                  alt={item.product?.name ?? "Product image"}
                  className="w-28 h-28 rounded object-cover"
                />

                <div className="flex-1">
                  <div className="flex flex-row justify-between">
                    <h2 className="text-xl font-semibold">
                      {item.product?.name ?? <span className="text-red-500">[Product Not Found]</span>}
                    </h2>
                    <h2 className="text-xl font-semibold">Rs. {getItemTotal(item)}</h2>
                  </div>

                  <div className="mt-2">
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {item.addonOptions?.map((a) => (
                        <li key={a.id}>
                          {a.optionName}{" "}
                          {a.additionalPrice > 0 && `(+Rs. ${a.additionalPrice})`}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? dispatch(removeCartItem(item.id))
                          : dispatch(
                              editCartItem({
                                id: item.id,
                                data: { quantity: item.quantity - 1 },
                              })
                            )
                      }
                      className={`p-2 rounded-full border ${
                        item.quantity === 1
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      } transition`}
                    >
                      {item.quantity === 1 ? (
                        <FaTrash className="w-4 h-4" />
                      ) : (
                        <FaMinus className="w-4 h-4" />
                      )}
                    </button>

                    <span className="text-lg font-semibold">{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          editCartItem({
                            id: item.id,
                            data: { quantity: item.quantity + 1 },
                          })
                        )
                      }
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        <OrderSummary
                total={total}
                deliveryCharges={deliveryCharge}
                posFee={posFee}
                discount={discount}
                grandTotal={grandTotal}
              />

        </div>
      )}
    </div>
  );
};

export default CartScreen;
