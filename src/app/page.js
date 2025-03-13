'use client';
import TopNav from './Components/TopNav';
import { useState } from 'react';
import Link from 'next/link';
import jwt from 'jsonwebtoken';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(data.message);
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="container">
            <div><TopNav/></div>
            <h1 className="title">Login</h1>
            <form onSubmit={handleLogin} className="form">
                <div className="formGroup">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Login</button>
                <Link href = './signup'><button type="button" className="SignUpButton">Create an account</button></Link>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}