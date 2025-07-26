import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuaceBoss from "../assets/Images/SauceBoss.jpg";


interface AddOn {
  id: number;
  name: string;
  price: number;
}

interface Product {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

const product: Product = {
  name: "Super Loaded Pizza",
  imageUrl: SuaceBoss,
  description: "Loaded with cheese, mushrooms, and premium toppings.",
  price: 999,
};

const dummyAddOns: AddOn[] = [
  { id: 1, name: "Extra Cheese", price: 100 },
  { id: 2, name: "Mushrooms", price: 50 },
  { id: 3, name: "Pepperoni", price: 70 },
  { id: 4, name: "Jalapenos", price: 40 },
  { id: 5, name: "None", price: 0 },
];

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const noneId = dummyAddOns[dummyAddOns.length - 1].id; // always get 'None'
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([noneId]);
  const [quantity, setQuantity] = useState<number>(1);

  const toggleAddOn = (id: number) => {
    if (id === noneId) {
      setSelectedAddOns([noneId]);
    } else {
      setSelectedAddOns((prev) => {
        let newSelection: number[];

        if (prev.includes(id)) {
          newSelection = prev.filter((addOnId) => addOnId !== id);
        } else {
          newSelection = [...prev.filter((i) => i !== noneId), id];
        }

        return newSelection.length > 0 ? newSelection : [noneId];
      });
    }
  };

  const addOnsTotal = dummyAddOns.reduce(
    (sum, addOn) =>
      selectedAddOns.includes(addOn.id) ? sum + addOn.price : sum,
    0
  );

  const totalPrice = (product.price + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    const selectedNames = dummyAddOns
      .filter((a) => selectedAddOns.includes(a.id))
      .map((a) => a.name)
      .join(", ");
    alert(
      `Added ${quantity} x ${product.name} with ${
        selectedAddOns.length > 0 ? selectedNames : "no"
      } add-on(s) to cart. Total: Rs. ${totalPrice}`
    );
    navigate("/cart");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <div className="mb-4">
        <img
          src={product.imageUrl}
          alt="Product"
          className="w-full h-auto rounded"
        />
      </div>

      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-medium mb-4">Base Price: Rs. {product.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mb-6">
        <p className="text-lg font-semibold">Quantity:</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="w-8 h-8 bg-gray-200 text-lg rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="min-w-[2rem] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="w-8 h-8 bg-gray-200 text-lg rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Choose Add-ons:</h2>
      <div className="space-y-2 mb-6">
        {dummyAddOns.map((addOn) => (
          <label
            key={addOn.id}
            className="flex items-center justify-between gap-3 p-3 rounded border border-gray-300 hover:border-blue-500 transition cursor-pointer"
          >
            <span>
              {addOn.name}{" "}
              <span className="text-sm text-gray-500">(+Rs. {addOn.price})</span>
            </span>

            <input
              type="checkbox"
              value={addOn.id}
              checked={selectedAddOns.includes(addOn.id)}
              onChange={() => toggleAddOn(addOn.id)}
              className="appearance-none cursor-pointer h-4 w-4 border border-gray-400 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none"
            />
          </label>
        ))}
      </div>

      <p className="text-lg font-semibold mb-4">Total: Rs. {totalPrice}</p>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
