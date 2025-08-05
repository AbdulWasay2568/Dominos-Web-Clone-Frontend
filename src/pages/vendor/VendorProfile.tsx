import React, { useState, useEffect } from 'react';

const ProfileSettingsPage = () => {
  const [vendor, setVendor] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    storeName: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch current vendor data (mocked)
    const fetchVendor = async () => {
      // Replace with actual API call
      const res = {
        name: 'Ali Vendor',
        email: 'ali@example.com',
        phone: '0312-1234567',
        location: 'Lahore, Pakistan',
        storeName: 'Domino’s Johar Town',
      };
      setVendor(res);
    };
    fetchVendor();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Replace with API call
    await new Promise((res) => setTimeout(res, 1000));
    setIsSaving(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Profile & Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={vendor.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={vendor.email}
            onChange={handleChange}
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={vendor.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Store Name</label>
          <input
            name="storeName"
            value={vendor.storeName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            name="location"
            value={vendor.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default ProfileSettingsPage;
