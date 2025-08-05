import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createProduct, updateProduct, getAllProducts } from "../../redux/slices/product.slice";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: File | null;
  addons: Addon[];
}

interface Addon {
  name: string;
  options: AddonOption[];
}

interface AddonOption {
  optionName: string;
  additionalPrice: number;
}

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('Pizzas');
  const [addons, setAddons] = useState<Addon[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Fetch all products on mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Set form values if editing
  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        setName(product.name);
        setDesc(product.description);
        setPrice(product.price);
        setCategory(product.category || 'Pizzas');
        setAddons(product.addons || []);
        setPreview(product.image); // Assuming image is a URL if editing
      }
    }
  }, [id, products]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleAddAddon = () => {
    setAddons([...addons, { name: '', options: [] }]);
  };

  const handleAddonChange = (index: number, value: string) => {
    const updated = [...addons];
    updated[index].name = value;
    setAddons(updated);
  };

  const handleAddOption = (addonIndex: number) => {
    const updated = [...addons];
    updated[addonIndex].options.push({ optionName: '', additionalPrice: 0 });
    setAddons(updated);
  };

  const handleOptionChange = (
    addonIndex: number,
    optionIndex: number,
    field: keyof AddonOption,
    value: string | number
  ) => {
    const updated = [...addons];
    updated[addonIndex].options[optionIndex][field] =
      field === 'additionalPrice' ? Number(value) : value;
    setAddons(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      id: id ? Number(id) : undefined,
      name,
      description: desc,
      price,
      category,
      image,
      addons,
    };

    if (id) {
      await dispatch(updateProduct(productData));
    } else {
      await dispatch(createProduct(productData));
    }

    navigate("/vendor/products");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {id ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-blue-500"
            rows={3}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded focus:outline-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-blue-500"
          >
            <option value="Pizzas">Pizzas</option>
            <option value="Sides">Sides</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-3 h-24 rounded border" />
          )}
        </div>

        {/* Addons */}
        <div>
          <label className="block mb-2 font-semibold">Addons</label>
          {addons.map((addon, i) => (
            <div key={i} className="mb-4 border p-3 rounded bg-gray-50">
              <input
                type="text"
                placeholder="Addon Name"
                value={addon.name}
                onChange={(e) => handleAddonChange(i, e.target.value)}
                className="w-full border px-2 py-1 rounded mb-2"
              />

              {addon.options.map((opt, j) => (
                <div key={j} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Option Name"
                    value={opt.optionName}
                    onChange={(e) =>
                      handleOptionChange(i, j, 'optionName', e.target.value)
                    }
                    className="flex-1 border px-2 py-1 rounded"
                  />
                  <input
                    type="number"
                    placeholder="+Price"
                    value={opt.additionalPrice}
                    onChange={(e) =>
                      handleOptionChange(i, j, 'additionalPrice', e.target.value)
                    }
                    className="w-28 border px-2 py-1 rounded"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddOption(i)}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Option
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddAddon}
            className="text-green-600 font-medium hover:underline"
          >
            + Add Addon
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {id ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
