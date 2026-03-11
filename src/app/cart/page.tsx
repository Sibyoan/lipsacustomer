"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { cart, loading, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Please login to view your cart</h1>
            <Link href="/account/login" className="text-[#d72323] hover:underline">
              Go to Login
            </Link>
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
          <div>Loading cart...</div>
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
          <h1 className="text-3xl font-bold text-[#0b1726] mb-8">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
              <Link href="/" className="text-[#d72323] hover:underline">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex gap-4 p-6 border-b last:border-b-0">
                      <img
                        src={item.image || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="grow">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-[#d72323] font-bold mb-2">₹{item.price}</p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-3 py-1 border border-gray-300 rounded"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-3 py-1 border border-gray-300 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg mb-2">₹{item.price * item.quantity}</p>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#d72323]">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-[#d72323] text-white font-bold py-3 rounded hover:bg-[#b81e1e] transition-colors uppercase"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
