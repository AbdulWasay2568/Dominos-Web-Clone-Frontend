import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductById } from "../redux/slices/product.slice";
import { addProductWithAddonsToCart } from "../redux/slices/cart.slice"
import { AddonOption } from "../interfaces/addonOptions.interface";

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.state?.productId;

  const dispatch = useAppDispatch();
  const { product, error } = useAppSelector((state) => state.product);
  const user = useAppSelector((state) => state.auth.user);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedFirstOption, setSelectedFirstOption] = useState<AddonOption | null>(null);
  const [selectedExtraOptions, setSelectedExtraOptions] = useState<number[]>([]);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.addons?.length && product.addons.length > 0) {
      const firstAddon = product.addons[0];
      if (firstAddon?.options?.length && firstAddon.options.length > 0) {
        setSelectedFirstOption(firstAddon.options[0]);
      }
    }
  }, [product]);

const toggleExtraOption = (optionId: number) => {
  setSelectedExtraOptions((prev) =>
    prev.includes(optionId)
      ? prev.filter((id) => id !== optionId) // Unselect if already selected
      : [...prev, optionId] // Otherwise add
  );
};

  const extraAddOnsTotal =
    product?.addons
      ?.slice(1)
      .flatMap((addon) => addon.options)
      .filter((option) => selectedExtraOptions.includes(option.id))
      .reduce((sum, opt) => sum + opt.additionalPrice, 0) || 0;

  const totalPrice = ((selectedFirstOption?.additionalPrice || 0) + extraAddOnsTotal) * quantity;

  const handleAddToCart = () => {
    if (!product) return;

    if (!user || user.id === null || user === undefined) {
      navigate("/login");
      return;
    }

    const addonOptionIds = [
      ...(selectedFirstOption ? [selectedFirstOption.id] : []),
      ...selectedExtraOptions,
    ];

    dispatch(
      addProductWithAddonsToCart({
        userId: Number(user.id),
        productId: product.id,
        quantity,
        addonOptionIds,
      })
    );

    navigate("/cart");
  };



  if (error) return <p className="text-center text-red-600 mt-8">Error: {error}</p>;
  if (!product) return <p className="text-center mt-8">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <div className="mb-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded" />
      </div>

      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

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

      {/* First Addon Option (Mandatory) */}
      {product.addons?.[0] && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{product.addons[0].name}</h2>
          <div className="flex flex-col gap-2">
            {product.addons[0].options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between gap-3 p-3 rounded border transition cursor-pointer ${
                  selectedFirstOption?.id === option.id
                    ? "border-blue-500"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <span>
                  {option.optionName}{" "}
                  <span className="text-sm text-gray-500">(Rs. {option.additionalPrice})</span>
                </span>

                <input
                  type="radio"
                  name="first-addon"
                  checked={selectedFirstOption?.id === option.id}
                  onChange={() => setSelectedFirstOption(option)}
                  className="cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Addons (Optional) */}
      {product.addons?.slice(1).map((addon) => (
        <div key={addon.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{addon.name}</h2>
          <div className="flex flex-col gap-2">
            {addon.options.map((option) => (
              <label
                key={option.id}
                className="flex items-center justify-between gap-3 p-3 rounded border border-gray-300 hover:border-blue-400 transition cursor-pointer"
              >
                <span>
                  {option.optionName}{" "}
                  <span className="text-sm text-gray-500">(+Rs. {option.additionalPrice})</span>
                </span>

                 <span className="flex items-center justify-center h-3 w-3 rounded-full border border-gray-600">
                  <input
                    type="checkbox"
                    checked={selectedExtraOptions.includes(option.id)}
                    onChange={() => toggleExtraOption(option.id)}
                    className="appearance-none h-1.5 w-1.5 rounded-full checked:bg-blue-500 transition duration-200 cursor-pointer"
                  />
                </span>

              </label>
            ))}
          </div>
        </div>
      ))}

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
