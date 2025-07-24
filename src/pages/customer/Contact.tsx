// src/pages/Contact.tsx
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add email sending or API logic here
    console.log('Message sent:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Subject of your message"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
