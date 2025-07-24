
import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Product:", formData);
    // call API here
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border p-2 rounded"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          className="border p-2 rounded"
          onChange={handleChange}
          value={formData.price}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          className="border p-2 rounded"
          onChange={handleChange}
          value={formData.stock}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="border p-2 rounded"
          onChange={handleChange}
          value={formData.image}
        />
      </div>
      <textarea
        name="description"
        placeholder="Product Description"
        className="w-full border p-2 rounded mb-4"
        onChange={handleChange}
        value={formData.description}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default AddProduct;
