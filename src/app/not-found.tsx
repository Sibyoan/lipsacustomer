"use client";

import Link from 'next/link';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="grow flex items-center justify-center">
        <div className="max-w-300 mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-black text-[#d72323] mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-[#d72323] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b81e1e] transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/collections/best-selling-products"
              className="inline-block bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Browse Products
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { name: 'Kitchen', href: '/collections/kitchen-accessories' },
                { name: 'Electronics', href: '/collections/electronics' },
                { name: 'Home Essentials', href: '/collections/home-essentials' },
                { name: 'Best Sellers', href: '/collections/best-selling-products' },
                { name: 'New Arrivals', href: '/collections/just-arrived' },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
