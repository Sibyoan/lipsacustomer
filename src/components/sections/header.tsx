"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, userData, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const navItems = [
    { name: 'Just Arrived', href: '/collections/just-arrived' },
    { name: 'Best Seller', href: '/collections/best-seller' },
    { name: 'Brand Gallery', href: '/collections/brand-gallery' },
    { name: 'Health & Personal Care', href: '/collections/health-personal-care' },
    { name: 'Home & Kitchen', href: '/collections/home-kitchen' },
    { name: 'Home Improvement', href: '/collections/home-improvement' },
    { name: 'Jewellery', href: '/collections/jewellery' },
    { name: 'Office Products', href: '/collections/office-products' },
    { name: 'Electronics', href: '/collections/electronics' },
    { name: 'Toys & Games', href: '/collections/toys-games' },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-[9997]">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded">
                <Menu className="w-5 h-5" />
              </button>
              <a href="/" className="text-2xl font-bold text-[#d72323]">
                LIPSA
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d72323] focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-[#d72323]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 hover:bg-gray-100 rounded">
                <Search className="w-5 h-5" />
              </button>
              
              {/* User Account */}
              <div className="relative z-[10000]" ref={userMenuRef}>
                {user ? (
                  <>
                    <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="hidden lg:inline text-sm">{userData?.name || 'Account'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-200 z-[10000]">
                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-900 truncate">{userData?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="py-1">
                          <Link 
                            href="/account/profile" 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </Link>
                          <Link 
                            href="/orders" 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>My Orders</span>
                          </Link>
                        </div>
                        
                        {/* Logout */}
                        <div className="border-t border-gray-200 py-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href="/account/login" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline text-sm">Login</span>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:inline text-sm">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d72323] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-[#0b1726] hidden lg:block relative">
        <div className="overflow-x-auto scrollbar-hide scroll-smooth">
          <div className="max-w-[1200px] mx-auto px-12">
            <ul className="flex items-center justify-center min-w-max">
              {navItems.map((item, index) => (
                <li key={index} className="relative">
                  <a 
                    href={item.href} 
                    className="flex items-center gap-1.5 px-4 py-3.5 text-[11px] font-bold text-white hover:bg-[#d72323] transition-all duration-200 uppercase whitespace-nowrap tracking-wide"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}