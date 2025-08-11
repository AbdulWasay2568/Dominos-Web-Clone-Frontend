import React from "react";
import { CheckCircle, Clock, MapPin } from "lucide-react";

const trackingSteps = [
  { label: "Order Placed", completed: true },
  { label: "Preparing", completed: true },
  { label: "Out for Delivery", completed: false },
  { label: "Delivered", completed: false },
];

const OrderTracking: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Track Your Order</h2>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-black">Order ID:</span> #123456789
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-black">Estimated Delivery:</span>{" "}
          30-45 minutes
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6 bg-white rounded-lg shadow p-6">
        {trackingSteps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            {step.completed ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <Clock className="text-gray-400 w-6 h-6" />
            )}
            <div>
              <p className={`text-lg ${step.completed ? "text-black" : "text-gray-400"}`}>
                {step.label}
              </p>
              {index !== trackingSteps.length - 1 && (
                <div className="border-l-2 border-dashed border-gray-300 h-6 ml-3"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Current Location */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Rider Location</h3>
        <div className="flex items-center space-x-3 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span>Near Main Boulevard, DHA Phase 6, Lahore</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
