import React, { useState } from 'react';

const MyAddresses = () => {
  const [addresses, setAddresses] = useState<string[]>([]);

  const addNewAddress = () => {
    const newAddress = prompt('Enter new address');
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Addresses</h2>

      {addresses.length === 0 ? (
        <p className="text-gray-600">No address found</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {addresses.map((addr, index) => (
            <li key={index} className="text-gray-800">
              {addr}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={addNewAddress}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Address
      </button>
    </div>
  );
};

export default MyAddresses;
