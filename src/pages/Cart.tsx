import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCartByUserId } from "../redux/slices/cart.slice";
import { CartItem } from "../interfaces/cartItem.interface";
import SauceBoss from "../assets/Images/SauceBoss.jpg";

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const currentCart = useAppSelector((state) => state.cart.currentCart);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (user?.id) {
      dispatch(getCartByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (currentCart?.cartItems) {
      // Optionally enrich with image or fallback
      const updated = currentCart.cartItems.map((item) => ({
        ...item,
        name: item.product.name,
        price: item.product.price,
        imageUrl: SauceBoss,
        addonOptions: item.addonOptions ?? [],
      }));
      setCart(updated);
    }
  }, [currentCart]);

  const handleIncrease = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getItemTotal = (item: CartItem) => {
    const addOnTotal = item.addonOptions?.reduce((sum, a) => sum + a.additionalPrice, 0) || 0;
    return (item.price + addOnTotal) * item.quantity;
  };

  const total = cart.reduce((sum, item) => sum + getItemTotal(item), 0);
  const deliveryCharge = 129;
  const posFee = 0;
  const discount = 0;
  const grandTotal = total + deliveryCharge + posFee - discount;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-28 h-28 rounded object-cover"
                />

                <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>

                  <div className="mt-2">
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {item.addonOptions?.map((a) => (
                        <li key={a.id}>
                          {a.optionName} {a.additionalPrice > 0 && `(+Rs. ${a.additionalPrice})`}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? handleRemove(item.id)
                          : handleDecrease(item.id)
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
                      onClick={() => handleIncrease(item.id)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-5 rounded-lg shadow space-y-4 h-fit">
            <h2 className="text-xl font-bold">Checkout</h2>

            <div>
              <label className="block font-medium mb-1">Delivery Instructions</label>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Instructions for Delivery Expert..."
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="border-t pt-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>Rs. {deliveryCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>POS Fee</span>
                <span>Rs. {posFee}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Your Discount</span>
                <span>- Rs. {discount.toFixed(1)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </div>

            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
