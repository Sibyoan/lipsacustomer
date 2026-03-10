"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(email, password, name);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-[28px] font-bold text-[#0b1726] mb-2 text-center">Create Account</h1>
            <p className="text-gray-600 text-sm text-center mb-6">Join DeoDap Wholesale today</p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#d72323]" 
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#d72323]" 
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#d72323]" 
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#d72323] text-white font-bold py-3 rounded hover:bg-[#b81e1e] transition-colors uppercase tracking-wide disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Register'}
              </button>
            </form>
            
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account? <Link href="/account/login" className="text-[#d72323] font-semibold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
