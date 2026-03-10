"use client";

import Link from 'next/link';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders, loading, error } = useOrders();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold mb-4">Please login to view your orders</h1>
              <p className="text-gray-600 mb-6">You need to be logged in to access your order history.</p>
              <Link 
                href="/account/login" 
                className="bg-[#d72323] text-white px-6 py-3 rounded-lg hover:bg-[#b81e1e] transition-colors"
              >
                Go to Login
              </Link>
            </div>
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
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#d72323] border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Orders</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-[#d72323] text-white px-6 py-3 rounded-lg hover:bg-[#b81e1e] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
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
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#0b1726]">My Orders</h1>
            <Link 
              href="/" 
              className="text-[#d72323] hover:underline"
            >
              Continue Shopping
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
              <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <Link 
                href="/" 
                className="bg-[#d72323] text-white px-6 py-3 rounded-lg hover:bg-[#b81e1e] transition-colors inline-block"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                      <p className="text-sm text-gray-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Date not available'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        (order.orderStatus || order.status) === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        (order.orderStatus || order.status) === 'processing' ? 'bg-blue-100 text-blue-800' :
                        (order.orderStatus || order.status) === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        (order.orderStatus || order.status) === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {(order.orderStatus || order.status).charAt(0).toUpperCase() + (order.orderStatus || order.status).slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.products.slice(0, 3).map((product, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                        <img 
                          src={product.product?.image || product.image || '/placeholder-product.jpg'} 
                          alt={product.product?.name || product.name}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{product.product?.name || product.name}</p>
                          <p className="text-sm text-gray-600">Qty: {product.quantity} × ₹{product.product?.price || product.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(product.product?.price || product.price) * product.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.products.length > 3 && (
                      <div className="text-center text-sm text-gray-500 py-2">
                        +{order.products.length - 3} more item{order.products.length - 3 !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="font-bold text-lg">Total: ₹{order.totalPrice || order.totalAmount}</p>
                      <p className="text-sm text-gray-600">
                        Payment: {order.paymentMethod || 'COD'} • 
                        <span className={`ml-1 ${
                          order.paymentStatus === 'paid' ? 'text-green-600' :
                          order.paymentStatus === 'failed' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {(order.paymentStatus || 'pending').charAt(0).toUpperCase() + (order.paymentStatus || 'pending').slice(1)}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link 
                        href={`/orders/${order.id}`}
                        className="bg-[#d72323] text-white px-4 py-2 rounded hover:bg-[#b81e1e] transition-colors"
                      >
                        View Details
                      </Link>
                      {(order.orderStatus === 'delivered' || order.status === 'delivered') && (
                        <Link 
                          href={`/orders/${order.id}#return`}
                          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                        >
                          Return
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}