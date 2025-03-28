"use client";

import { useState } from 'react';
import Link from "next/link";
import HomeNav from '../Components/HomeNav';
import SplineButton from "../Components/SplineButton";  // ✅ Import SplineButton
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    nameError: '',
    emailError: '',
    phoneError: '',
    roleError: '',
    dobError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const router = useRouter();

  // Validation function
  const validateFields = () => {
    const errors = {};

    // Validate each field
    if (!name) errors.nameError = 'Name is required';
    else if (!email) errors.emailError = 'Email is required';
    else if (!phone) errors.phoneError = 'Phone number is required';
    else if (!role) errors.roleError = 'Role is required';
    else if (!dob) errors.dobError = 'Date of birth is required';
    else if (!password) errors.passwordError = 'Password is required';
    else if (!confirmPassword) errors.confirmPasswordError = 'Confirm password is required';
    else if (password && confirmPassword && password !== confirmPassword) errors.confirmPasswordError = 'Passwords do not match';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;  // return false if there are errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form is valid before submitting
    const isValid = validateFields();
    if (!isValid) return;  // Do not submit if form is invalid

    setError('');  // Clear any previous error

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, role, dob, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to sign up");
      } else {
        console.log("Form submitted successfully");
        alert("Registration successful!");

        router.push("/login"); // Navigate to the login page
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // Check if there are no form errors
  const isFormValid =
  name &&
  email &&
  phone &&
  role &&
  dob &&
  password &&
  confirmPassword &&
  password === confirmPassword &&
  Object.values(formErrors).every((error) => error === '');

  const isButtonDisabled = !isFormValid || Object.values(formErrors).some(error => error !== '');

  return (
    <main>
      <div>
        <HomeNav />
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
        <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={name}
              onChange={(e) => { 
                setName(e.target.value);
                setFormErrors({ ...formErrors, nameError: '' }); // Clear error on change
              }}
            />
            {formErrors.nameError && <p className="text-red-500 text-sm">{formErrors.nameError}</p>}

            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={email}
              onChange={(e) => { 
                setEmail(e.target.value);
                setFormErrors({ ...formErrors, emailError: '' }); // Clear error on change
              }}
            />
            {formErrors.emailError && <p className="text-red-500 text-sm">{formErrors.emailError}</p>}

            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={phone}
              onChange={(e) => { 
                setPhone(e.target.value.replace(/\D/, ""));
                setFormErrors({ ...formErrors, phoneError: '' }); // Clear error on change
              }}
            />
            {formErrors.phoneError && <p className="text-red-500 text-sm">{formErrors.phoneError}</p>}

            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full px-3 py-2 border border-black rounded-md"
              value={role}
              onChange={(e) => { 
                setRole(e.target.value);
                setFormErrors({ ...formErrors, roleError: '' }); // Clear error on change
              }}
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Field Owner">Field Owner</option>
              <option value="Player">Player</option>
              <option value="Referee">Referee</option>
              <option value="Team Manager">Team Manager</option>
            </select>
            {formErrors.roleError && <p className="text-red-500 text-sm">{formErrors.roleError}</p>}

            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={dob}
              onChange={(e) => { 
                setDob(e.target.value);
                setFormErrors({ ...formErrors, dobError: '' }); // Clear error on change
              }}
            />
            {formErrors.dobError && <p className="text-red-500 text-sm">{formErrors.dobError}</p>}

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={password}
              onChange={(e) => { 
                setPassword(e.target.value);
                setFormErrors({ ...formErrors, passwordError: '' }); // Clear error on change
              }}
            />
            {formErrors.passwordError && <p className="text-red-500 text-sm">{formErrors.passwordError}</p>}

            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={confirmPassword}
              onChange={(e) => { 
                setConfirmPassword(e.target.value);
                setFormErrors({ ...formErrors, confirmPasswordError: '' }); // Clear error on change
              }}
            />
            {formErrors.confirmPasswordError && <p className="text-red-500 text-sm">{formErrors.confirmPasswordError}</p>}

            <p className="text-red-500 text-sm mb-0">{error}</p>

            {/* Spline Animated Submit Button */}
            <div 
              className={`relative z-10 ${isFormValid ? "pointer-events-auto" : "pointer-events-none opacity-50"}`}
            >
              <SplineButton isValid={isFormValid} onClick={isFormValid ? handleSubmit : null} />
            </div>




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
