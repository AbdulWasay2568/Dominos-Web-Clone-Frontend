import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createProductWithAddon, updateProductByIdWithImage } from "../../redux/slices/product.slice";
import { getAllCategories } from "../../redux/slices/category.slice";

interface AddonOption {
  optionName: string;
  additionalPrice: number;
}

interface Addon {
  name: string;
  options: AddonOption[];
}

interface ProductFormProps {
  editMode?: boolean;
  productId?: number;
  initialData?: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    addons: Addon[];
    imageUrl?: string;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({
  editMode = false,
  productId,
  initialData,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState(initialData?.name || '');
  const [desc, setDesc] = useState(initialData?.description || '');
  const [price, setPrice] = useState<number>(initialData?.price || 0);
  const [category, setCategory] = useState('');
  const [addons, setAddons] = useState<Addon[]>(initialData?.addons || []);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.imageUrl || null);

  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData && categories.length > 0) {
      const cat = categories.find((c) => c.id === initialData.categoryId);
      if (cat) {
        setCategory(cat.name);
      }
    }
  }, [categories, initialData]);

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

    const selectedCategory = categories.find((cat) => cat.name === category);
    if (!selectedCategory) {
      alert('Invalid category selected');
      return;
    }

    const productData = {
      name,
      description: desc,
      price,
      categoryId: selectedCategory.id,
      addons: addons.map((addon) => ({
        name: addon.name,
        options: addon.options.map((option) => ({
          name: option.optionName,
          price: option.additionalPrice,
        })),
      })),
    };

    try {
      if (editMode && productId) {
        await dispatch(updateProductByIdWithImage({
          id: productId,
          data: productData,
          image,
        })).unwrap();
      } else {
        if (!image) {
          alert('Please upload a product image');
          return;
        }

        await dispatch(createProductWithAddon({
          data: productData,
          imageFile: image,
        })).unwrap();
      }

      // navigate('/vendor/products');
    } catch (err) {
      console.error(editMode ? 'Failed to update product:' : 'Failed to create product:', err);
      alert(editMode ? 'Failed to update product' : 'Failed to create product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {editMode ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-blue-500"
            required
          />
        </div>

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

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

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

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {editMode ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
