// src/pages/customer/Profile.tsx
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
