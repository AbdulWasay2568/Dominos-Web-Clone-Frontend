// src/pages/auth/Register.tsx
import React from 'react';

const Register: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form className="space-y-4">
        <input className="w-full p-2 border rounded" type="text" placeholder="Full Name" />
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" />
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
