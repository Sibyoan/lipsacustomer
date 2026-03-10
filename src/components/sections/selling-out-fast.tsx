"use client";
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

export default function SellingOutFast() {
  const { products, loading, error } = useProducts({
    bestSelling: true,
    limitCount: 10
  });

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
            <h2 className="text-[20px] font-semibold text-black m-0 text-left">Selling Out Fast</h2>
            <a href="/collections/best-selling-products" className="bg-[#d72323] text-white text-[11px] font-bold px-4 py-1.5 rounded uppercase tracking-wide hover:bg-[#b81e1e] transition-colors">
              View All
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-2.5 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
            <h2 className="text-[20px] font-semibold text-black m-0 text-left">Selling Out Fast</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>Unable to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
            <h2 className="text-[20px] font-semibold text-black m-0 text-left">Selling Out Fast</h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>No best-selling products available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
          <h2 className="text-[20px] font-semibold text-black m-0 text-left">Selling Out Fast</h2>
          <a href="/collections/best-selling-products" className="bg-[#d72323] text-white text-[11px] font-bold px-4 py-1.5 rounded uppercase tracking-wide hover:bg-[#b81e1e] transition-colors">
            View All
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
