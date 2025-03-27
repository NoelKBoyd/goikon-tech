'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HomeNav from '../Components/HomeNav';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

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

            // Redirect based on roleId
            switch (data.roleId) {
                case 2:
                    router.push('/admin'); // Admin page
                    break;
                case 4:
                    router.push('/player'); // Manager page
                    break;
                case 5:
                    router.push('/fieldowner'); // Referee page
                    break;
                case 7:
                    router.push('/teammanager'); // teammanager page
                    break;
                case 8:
                    router.push('/referee'); // referee page
                    break;    
                default:
                    router.push('/'); // Default user page
            }
        } else {
            setError(data.message);
        }
    };

    return (
        <main>
            <div><HomeNav /></div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8 w-96">
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                            />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                            Login
                        </button>
                        <Link href="/signup">
                            <button type="button" className="w-full border border-black text-black py-2 rounded-md hover:bg-gray-200 transition">
                                Create an account
                            </button>
                        </Link>
                    </form>
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
                </div>
            </div>
        </main>
    );
}
