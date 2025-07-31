import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const address = location.state?.address;
  const orderId = location.state?.orderId;
  const paymentMethod = location.state?.paymentMethod;

  const deliveryInstructions = "Ring the bell twice.";
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Address & Instructions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p><span className="font-medium">Address:</span>{address}</p>
            <p className="mt-2"><span className="font-medium">Instructions:</span> {deliveryInstructions}</p>
            <p className="mt-2"><span className="font-medium">Payment:</span> {paymentMethod}</p>
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
