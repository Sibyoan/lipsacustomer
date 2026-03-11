"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useReturns } from '@/hooks/useReturns';
import { Order } from '@/hooks/useOrders';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { getOrderById } = useOrders();
  const { createReturn, returns } = useReturns();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [returningProductId, setReturningProductId] = useState<string>('');

  useEffect(() => {
    if (!user) {
      router.push('/account/login');
      return;
    }
    fetchOrder();
  }, [user, params.orderId]);

  const fetchOrder = async () => {
    try {
      const orderData = await getOrderById(params.orderId as string);
      if (orderData) {
        setOrder(orderData);
      } else {
        router.push('/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      router.push('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleReturnRequest = async (productId: string) => {
    setReturningProductId(productId);
    setShowReturnModal(true);
  };

  const submitReturnRequest = async () => {
    if (!order || !returningProductId || !returnReason.trim()) return;

    try {
      const product = order.products.find(p => p.productId === returningProductId);
      if (!product) return;

      await createReturn({
        orderId: order.id,
        productId: returningProductId,
        customerId: order.customerId,
        vendorId: product.vendorId,
        reason: returnReason,
        status: 'pending'
      });

      alert('Return request submitted successfully!');
      setShowReturnModal(false);
      setReturnReason('');
      setReturningProductId('');
    } catch (error) {
      console.error('Error submitting return request:', error);
      alert('Failed to submit return request. Please try again.');
    }
  };

  // Helper function to check if a product has an existing return request
  const getProductReturnStatus = (productId: string) => {
    if (!order) return null;
    
    const existingReturn = returns.find(
      (returnReq) => returnReq.orderId === order.id && returnReq.productId === productId
    );
    
    return existingReturn;
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#d72323] border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Order not found</h1>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link href="/orders" className="text-[#d72323] hover:underline">
              Back to Orders
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Only show return button for delivered orders
  const canReturn = (order.orderStatus === 'delivered' || order.status === 'delivered');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="grow bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/orders" className="text-[#d72323] hover:underline mb-4 inline-block">
              ← Back to Orders
            </Link>
            <h1 className="text-3xl font-bold text-[#0b1726]">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.products.map((item, index) => {
                    const returnStatus = getProductReturnStatus(item.productId);
                    
                    return (
                      <div key={`${item.productId}-${index}`} className="flex gap-4 p-4 border rounded">
                        <img 
                          src={item.product?.image || item.image || '/placeholder-product.jpg'} 
                          alt={item.product?.name || item.name}
                          className="w-20 h-20 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.product?.name || item.name}</h3>
                          <p className="text-gray-600">Category: {item.product?.category || 'General'}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="font-bold text-[#d72323]">₹{item.product?.price || item.price}</p>
                          <p className="text-sm text-gray-500">Subtotal: ₹{(item.product?.price || item.price) * item.quantity}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {returnStatus ? (
                            <div className={`px-3 py-1 rounded text-sm ${
                              returnStatus.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              returnStatus.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Return {returnStatus.status}
                            </div>
                          ) : canReturn ? (
                            <button
                              onClick={() => handleReturnRequest(item.productId)}
                              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-sm"
                            >
                              Return Product
                            </button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                  <div className="text-gray-700">
                    <p className="font-medium">{order.customerName || 'Customer'}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    <p>{order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Order Date:</span>
                    <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Date not available'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Order Status:</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      (order.orderStatus || order.status) === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      (order.orderStatus || order.status) === 'processing' ? 'bg-blue-100 text-blue-800' :
                      (order.orderStatus || order.status) === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      (order.orderStatus || order.status) === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {(order.orderStatus || order.status).charAt(0).toUpperCase() + (order.orderStatus || order.status).slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Payment Status:</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {(order.paymentStatus || 'pending').charAt(0).toUpperCase() + (order.paymentStatus || 'pending').slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{order.paymentMethod || 'COD'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{order.products.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-[#d72323]">₹{order.totalPrice || order.totalAmount}</span>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors"
                  >
                    Print Order
                  </button>
                  {order.customerEmail && (
                    <a
                      href={`mailto:support@example.com?subject=Order ${order.id.slice(0, 8).toUpperCase()}&body=I need help with my order ${order.id}`}
                      className="w-full bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200 transition-colors text-center block"
                    >
                      Contact Support
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Return Product</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reason for return:</label>
              <textarea
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d72323] focus:border-transparent"
                rows={4}
                placeholder="Please explain why you want to return this product..."
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={submitReturnRequest}
                disabled={!returnReason.trim()}
                className="flex-1 bg-[#d72323] text-white py-2 rounded hover:bg-[#b81e1e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Return Request
              </button>
              <button
                onClick={() => {
                  setShowReturnModal(false);
                  setReturnReason('');
                  setReturningProductId('');
                }}
                className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}