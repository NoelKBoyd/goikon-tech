"use client";

import { useState } from 'react';
import Link from "next/link";
import TopNav from '../Components/TopNav';

export default function SignUp() {
  // State for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setError('');
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,     
          role,
          dob,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message || 'Failed to sign up');
      } else {
        alert('Registration successful!');
        // Optionally redirect the user or reset the form
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <main>
      <div><TopNav/></div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          {/* Email */}
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone Number */}
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Role */}
          <label htmlFor="Role" className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          {/* Date of Birth */}
          <label htmlFor="DateofBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          {/* Password */}
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Submit
          </button>
          <Link href="/login">
                        <button type="button" className="w-full border border-black text-black py-2 rounded-md hover:bg-gray-200 transition">
                            Log in
                        </button>
                    </Link>
        </form>
      </div>
    </div>
    </main>
  );
}
