
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewOrder } from "../../redux/slices/order.slice";
import { OrderStatus, PaymentStatus } from "../../interfaces/enums.interface"

const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const grandTotal = useAppSelector((state)=> state.order.grandTotal);
  const cart = useAppSelector((state)=> state.cart.currentCart);

  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [society, setSociety] = useState("");
  const [city, setCity] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });


  const handleCheckout = async() => {

    
    if (!cart?.userId || grandTotal == null || !cart.cartItems?.length) {
      console.error("Missing required order data");
      return;
    }

    const orderPayload = {
      userId: cart?.userId,
      totalAmount: grandTotal,
      status: OrderStatus.PENDING,
      orderItems: cart?.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        addonOptions: item.addonOptions.map(opt => opt.id),
      })),
      shippingInfo: {
        houseNo,
        street,
        society,
        city,
        zipCode: "54000" // or input field
      },
      payment: {
        method: paymentMethod,
        amount: grandTotal,
        status: PaymentStatus.PENDING
      }
    };

      try {
        const response = await dispatch(createNewOrder(orderPayload)).unwrap();
        navigate("/order-confirmation", {
          state: {
            orderId: response.id,
            address: `${houseNo}, ${street}, ${society}, ${city}`,
            paymentMethod,
          },
        });
      } catch (error) {
        console.error("Failed to place order:", error);
      }

  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🧾 Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Address */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Billing Address</h2>

          <input
            type="text"
            placeholder="House No"
            className="w-full border mb-3 rounded-lg p-3"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Street"
            className="w-full border mb-3 rounded-lg p-3"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            placeholder="Society"
            className="w-full border mb-3 rounded-lg p-3"
            value={society}
            onChange={(e) => setSociety(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border mb-3 rounded-lg p-3"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>

          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span>Credit/Debit Card</span>
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded-lg p-3"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="w-full border rounded-lg p-3"
                value={cardDetails.expiryMonth}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryMonth: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full border rounded-lg p-3"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {/* Delivery Instructions */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Instructions</h2>
          <textarea
            rows={4}
            placeholder="Instructions for Delivery Expert..."
            className="w-full border rounded-lg p-3"
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
          />

          {/* Place Order Button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={handleCheckout}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl w-full md:w-1/2 lg:w-1/3 transition-all"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;

