"use client";
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

export default function BabyEssentials() {
  const { products, loading, error } = useProducts({
    categorySlug: 'baby-essentials',
    limitCount: 12
  });

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-[22px] font-bold text-black text-center mb-8">
            Baby Essentials
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[...Array(12)].map((_, i) => (
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
          <h2 className="text-[22px] font-bold text-black text-center mb-8">
            Baby Essentials
          </h2>
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
          <h2 className="text-[22px] font-bold text-black text-center mb-8">
            Baby Essentials
          </h2>
          <div className="text-center py-8 text-gray-500">
            <p>No baby essentials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-[22px] font-bold text-black text-center mb-8">
          Baby Essentials
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
