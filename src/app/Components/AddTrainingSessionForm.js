'use client';

import { useState } from 'react';

export default function AddTrainingSessionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    focus: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSession = {
      ...formData,
      id: Date.now(),
    };
    onAdd(newSession);
    setFormData({ date: '', time: '', location: '', focus: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border-2 border-black rounded-lg shadow mb-8 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Training Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Time (e.g. 17:00 - 18:30)"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="focus"
          value={formData.focus}
          onChange={handleChange}
          placeholder="Focus"
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-black-700 transition"
      >
        Add Session
      </button>
    </form>
  );
}
