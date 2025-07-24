import React, { useEffect, useState } from "react";

interface Props {
  productId: string;
}

const EditProduct: React.FC<Props> = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    // Fetch product data by ID
    if (productId) {
      // Example:
      // fetch(`/api/products/${productId}`).then(res => res.json()).then(setFormData);
      setFormData({
        name: "Sample Product",
        price: "99.99",
        description: "This is a sample product.",
        stock: "50",
        image: "https://example.com/sample.jpg",
      });
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Product:", formData);
    // call update API
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="border p-2 rounded"
          required
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />
      </div>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="w-full border p-2 rounded mb-4"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update</button>
    </form>
  );
};

export default EditProduct;
