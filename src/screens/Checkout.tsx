import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutScreen: React.FC = () => {
    const navigate = useNavigate();
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
  const [eWalletNumber, setEWalletNumber] = useState("");

  const handleCheckout = () => {
    const fullAddress = `${houseNo}, ${street}, ${society}, ${city}`;
    console.log("Address:", fullAddress);
    console.log("Instructions:", deliveryInstructions);
    console.log("Payment Method:", paymentMethod);

    if (paymentMethod === "card") {
      console.log("Card Details:", cardDetails);
    } else if (paymentMethod === "easypaisa") {
      console.log("Easypaisa/JazzCash:", eWalletNumber);
    }
    
    navigate("/order-confirmation");

    // Proceed to payment or backend call
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Address + Instructions */}
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">House Number</label>
                <input
                  type="text"
                  placeholder="e.g. 123"
                  className="w-full border rounded-lg p-3"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Street</label>
                <input
                  type="text"
                  placeholder="e.g. Main Street"
                  className="w-full border rounded-lg p-3"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Society</label>
                <input
                  type="text"
                  placeholder="e.g. Bahria Town"
                  className="w-full border rounded-lg p-3"
                  value={society}
                  onChange={(e) => setSociety(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="e.g. Lahore"
                  className="w-full border rounded-lg p-3"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <div className="flex gap-6">
              {["cash", "card", "easypaisa"].map((method) => (
                <label key={method} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <span className="capitalize">
                    {method === "easypaisa" ? "Easypaisa / JazzCash" : method}
                  </span>
                </label>
              ))}
            </div>

            {/* Conditional Inputs */}
            {paymentMethod === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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
                  placeholder="Expiry Month (MM)"
                  className="w-full border rounded-lg p-3"
                  value={cardDetails.expiryMonth}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiryMonth: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Expiry Year (YYYY)"
                  className="w-full border rounded-lg p-3"
                  value={cardDetails.expiryYear}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiryYear: e.target.value })
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

            {paymentMethod === "easypaisa" && (
              <input
                type="text"
                placeholder="Easypaisa/JazzCash Phone Number"
                className="w-full border rounded-lg p-3 mt-4"
                value={eWalletNumber}
                onChange={(e) => setEWalletNumber(e.target.value)}
              />
            )}
          </div>

          {/* Delivery Instructions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Instructions</h2>
            <textarea
              rows={4}
              placeholder="Instructions for Delivery Expert..."
              className="w-full border rounded-lg p-3"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4 h-fit">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="flex justify-between text-gray-700">
            <span>Total</span>
            <span>Rs. 2298</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Charges</span>
            <span>Rs. 129</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>POS Fee</span>
            <span>Rs. 0</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Your Discount</span>
            <span>Rs. 0.0</span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between font-semibold text-lg text-gray-900">
            <span>Grand Total</span>
            <span>Rs. 2427</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
