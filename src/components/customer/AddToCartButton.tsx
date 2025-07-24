import React from 'react';

const AddToCartButton: React.FC<{ productId: number | string }> = ({ productId }) => {
  const handleAddToCart = () => {
    // Your logic here
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
