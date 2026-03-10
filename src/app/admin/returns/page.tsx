"use client";

import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { ReturnRequest } from '@/hooks/useReturns';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

export default function AdminReturnsPage() {
  const { user } = useAuth();
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd check if user is admin
    if (user) {
      fetchReturns();
    }
  }, [user]);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const returnsRef = collection(db, 'returns');
      const q = query(returnsRef, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const returnsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : (data.updatedAt ? new Date(data.updatedAt) : undefined)
        };
      }) as ReturnRequest[];

      setReturns(returnsData);
    } catch (error) {
      console.error('Error fetching returns:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReturnStatus = async (returnId: string, status: 'approved' | 'rejected') => {
    try {
      setProcessing(returnId);
      await updateDoc(doc(db, 'returns', returnId), {
        status,
        updatedAt: serverTimestamp()
      });
      
      await fetchReturns(); // Refresh the list
      alert(`Return request ${status} successfully!`);
    } catch (error) {
      console.error('Error updating return status:', error);
      alert('Failed to update return status. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p>You need to be logged in as an admin to access this page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow flex items-center justify-center">
          <div>Loading return requests...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#0b1726] mb-8">Return Requests Management</h1>

          {returns.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-xl text-gray-600">No return requests found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {returns.map((returnRequest) => (
                      <tr key={returnRequest.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {returnRequest.customerName || 'Customer'}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {returnRequest.customerId.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {returnRequest.productImage && (
                              <img 
                                src={returnRequest.productImage} 
                                alt={returnRequest.productName}
                                className="w-10 h-10 object-cover rounded mr-3"
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {returnRequest.productName || 'Unknown Product'}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {returnRequest.productId.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {returnRequest.vendorId.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                          <div className="truncate" title={returnRequest.reason}>
                            {returnRequest.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            returnRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            returnRequest.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {returnRequest.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {returnRequest.createdAt.toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {returnRequest.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateReturnStatus(returnRequest.id, 'approved')}
                                disabled={processing === returnRequest.id}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateReturnStatus(returnRequest.id, 'rejected')}
                                disabled={processing === returnRequest.id}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {returnRequest.status !== 'pending' && (
                            <span className="text-gray-400">
                              {returnRequest.status === 'approved' ? 'Approved' : 'Rejected'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}