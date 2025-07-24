// src/pages/AddressManagement.tsx
import React, { useState } from 'react';

interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
}

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addAddress = () => {
    const newAddress: Address = {
      id: Date.now(),
      ...formData,
    };
    setAddresses([...addresses, newAddress]);
    setFormData({ name: '', phone: '', street: '', city: '', zip: '' });
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Address Management</h2>

      {/* Address Form */}
      <div className="grid gap-4 mb-6">
        {['name', 'phone', 'street', 'city', 'zip'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        ))}
        <button
          onClick={addAddress}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Address
        </button>
      </div>

      {/* Address List */}
      <div>
        <h3 className="font-semibold mb-2">Saved Addresses:</h3>
        {addresses.length === 0 && <p className="text-gray-500">No addresses saved yet.</p>}
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border border-gray-200 p-4 mb-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{addr.name} ({addr.phone})</p>
              <p>{addr.street}, {addr.city}, {addr.zip}</p>
            </div>
            <button
              onClick={() => deleteAddress(addr.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
