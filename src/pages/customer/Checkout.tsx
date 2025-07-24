import React, { useState } from 'react';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    paymentMethod: 'card',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit order logic here
    alert('Order placed successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full border px-4 py-2 rounded"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Shipping Address</label>
          <input
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="123 Main St"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
