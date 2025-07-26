import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
    const navigate = useNavigate();
  // Dummy data for now — replace with actual order info
  const orderId = "ORD123456";
  const items = [
    {
      name: "Pepperoni Pizza",
      quantity: 2,
      addOns: ["Extra Cheese", "Jalapenos"],
      image: "/images/pizza.jpg",
      price: 1200,
    },
    {
      name: "Garlic Bread",
      quantity: 1,
      addOns: [],
      image: "/images/garlic.jpg",
      price: 300,
    },
  ];

  const address = {
    houseNumber: "12-B",
    street: "Main Boulevard",
    society: "DHA",
    city: "Lahore",
  };

  const paymentMethod = "Cash on Delivery";
  const deliveryInstructions = "Ring the bell twice.";
  const subtotal = 2700;
  const deliveryCharges = 129;
  const discount = 0;
  const grandTotal = subtotal + deliveryCharges - discount;

    const handleTrackOrder = () => {
        navigate("/order-tracking");
    };
    const handlebackToHome = () => {
        navigate("/");
    };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
        <h1 className="text-3xl font-semibold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Your order <span className="font-medium">{orderId}</span> has been placed successfully.</p>
      </div>

      {/* Order Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 border rounded-lg p-3 mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="font-medium">{item.name} × {item.quantity}</h3>
                {item.addOns.length > 0 && (
                  <p className="text-sm text-gray-500">Add-ons: {item.addOns.join(", ")}</p>
                )}
              </div>
              <div className="text-right font-medium">Rs. {item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        {/* Address & Instructions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p><span className="font-medium">Address:</span> {address.houseNumber}, {address.street}, {address.society}, {address.city}</p>
            <p className="mt-2"><span className="font-medium">Instructions:</span> {deliveryInstructions}</p>
            <p className="mt-2"><span className="font-medium">Payment:</span> {paymentMethod}</p>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charges</span>
              <span>Rs. {deliveryCharges}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Your Discount</span>
              <span>Rs. {discount}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Grand Total</span>
              <span>Rs. {grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-10 gap-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          onClick={() => handleTrackOrder()}>
          Track Order
        </button>
        <button className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          onClick={() => handlebackToHome()}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
