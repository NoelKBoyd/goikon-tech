"use client";

import { useState } from 'react';
import HomeNav from '../Components/HomeNav';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      setSuccess(result.success ? 'Message sent successfully!' : 'Failed to send message.');
    } catch (error) {
      setSuccess('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HomeNav />
      <div className="py-20">
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border rounded"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              className="w-full p-2 border rounded"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            <textarea
              className="w-full p-2 border rounded"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {success && <p className="mt-2 text-sm text-center text-green-600">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
