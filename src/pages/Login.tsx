// src/pages/auth/Login.tsx
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form className="space-y-4">
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" />
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
