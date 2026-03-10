"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/account/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow flex items-center justify-center">
          <div>Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#0b1726] mb-8">My Profile</h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded">
                  {userData?.name || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded">
                  {userData?.email || user.email || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded capitalize">
                  {userData?.role || 'Customer'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded">
                  {userData?.createdAt 
                    ? new Date(userData.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
