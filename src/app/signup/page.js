'use client';

import { useState } from 'react';
import Link from "next/link";
import HomeNav from '../Components/HomeNav';
import Spline from '@splinetool/react-spline';


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
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Clear any previous errors

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
        setSuccess(true);
        // Optionally reset form fields here if you want
        // setName(''); setEmail(''); setPhone(''); setRole(''); setDob(''); setPassword(''); setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <main>
      <div><HomeNav /></div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 relative">

        {/* ✅ Animation shown only when form is successfully submitted */}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <Spline scene="https://prod.spline.design/JEWQHUHXRKG5Fq9p/scene.splinecode" />
          </div>
        )}

        {/* Form is hidden if success is true */}
        {!success && (
          <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8 w-96 relative z-0">
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

              {/* Phone */}
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, ''))}
              />

              {/* Role */}
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Field Owner">Field Owner</option>
                <option value="Player">Player</option>
                <option value="Referee">Referee</option>
                <option value="Team Manager">Team Manager</option>
              </select>

              {/* Date of Birth */}
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* ✅ Replaced Submit Button */}
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
        )}
      </div>
    </main>
  );
}
