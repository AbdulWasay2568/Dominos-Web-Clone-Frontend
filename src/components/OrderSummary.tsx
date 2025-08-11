import React from 'react';
import { setGrandTotal } from "../redux/slices/order.slice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  total: number;
  deliveryCharges: number;
  posFee: number;
  discount: number;
  grandTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
  deliveryCharges,
  posFee,
  discount,
  grandTotal,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCheckout = () => {
    dispatch(setGrandTotal(grandTotal));
    navigate("/checkout");
  };
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4 h-fit w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

      <div className="flex justify-between text-gray-700">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Delivery Charges</span>
        <span>Rs. {deliveryCharges}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>POS Fee</span>
        <span>Rs. {posFee}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Your Discount</span>
        <span>Rs. {discount}</span>
      </div>

      <hr className="border-gray-300" />

      <div className="flex justify-between font-semibold text-lg text-gray-900">
        <span>Grand Total</span>
        <span>Rs. {grandTotal}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl transition-all"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
