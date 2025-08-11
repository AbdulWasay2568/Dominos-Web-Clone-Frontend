import { useState } from 'react';

const ProfileScreen = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Abdul Wasay');
  const [email, setEmail] = useState('wasay@example.com');
  const [phone, setPhone] = useState('03001234567');

  const [addresses, setAddresses] = useState([
    { id: 1, house: '123', street: 'Main St', society: 'DHA', city: 'Lahore' },
  ]);

  const [newAddress, setNewAddress] = useState({
    house: '',
    street: '',
    society: '',
    city: '',
  });

  const handleAddressChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  const addAddress = () => {
    const id = Date.now();
    setAddresses([...addresses, { id, ...newAddress }]);
    setNewAddress({ house: '', street: '', society: '', city: '' });
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              disabled={!editing}
              className="w-full border rounded-lg p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              disabled={!editing}
              className="w-full border rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              disabled={!editing}
              className="w-full border rounded-lg p-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Address Book</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {['house', 'street', 'society', 'city'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 mb-1 capitalize">{field}</label>
              <input
                type="text"
                className="w-full border rounded-lg p-3"
                value={newAddress[field]}
                onChange={(e) => handleAddressChange(field, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={addAddress}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Add Address
        </button>

        <div>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex justify-between items-center border p-4 mb-3 rounded-lg"
            >
              <p className="text-gray-800">
                {addr.house}, {addr.street}, {addr.society}, {addr.city}
              </p>
              <button
                onClick={() => deleteAddress(addr.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
