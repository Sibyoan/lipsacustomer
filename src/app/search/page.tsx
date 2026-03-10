"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import ProductCard from '@/components/ProductCard';
import { useSearch } from '@/hooks/useSearch';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, loading, search } = useSearch();
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    if (query) {
      search(query);
      setSearchTerm(query);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      search(searchTerm);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main className="grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#d72323]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Search Results</span>
          </nav>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="flex-grow px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#d72323]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#d72323] text-white font-bold rounded hover:bg-[#b81e1e] transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Results */}
          {query && (
            <h1 className="text-[32px] font-bold text-[#0b1726] mb-6">
              Search Results for "{query}"
            </h1>
          )}

          {loading && (
            <div className="text-center py-12">Searching...</div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No products found for "{query}"</p>
              <p className="text-gray-500">Try different keywords or browse our categories</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-gray-600 mb-6">{results.length} products found</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
