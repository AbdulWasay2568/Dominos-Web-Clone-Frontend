// src/pages/customer/Support.tsx
import React from 'react';

const Support: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Support</h2>
      <form className="space-y-4">
        <input className="w-full border p-2 rounded" type="text" placeholder="Subject" />
        <textarea className="w-full border p-2 rounded" placeholder="Describe your issue" rows={5}></textarea>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Send Message</button>
      </form>
    </div>
  );
};

export default Support;
