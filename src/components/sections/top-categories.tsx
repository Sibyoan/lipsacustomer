"use client";

import React from 'react';
import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';

// Emoji fallback icons for categories
const fallbackEmojis: Record<string, string> = {
  "Wedding Gifts": "💍",
  "Winter": "🧤",
  "Best selling": "🔥",
  "New Arrivals": "✨",
  "All Brands": "🏷️",
  "Kitchen": "🍳",
  "Gifts": "🎁",
  "Electronics": "📱",
  "Home Essentials": "🏠",
  "Kids & Baby": "🧸",
  "Health & Beauty": "💄",
  "Gardening": "🌱",
  "Fashion": "👗",
  "Beauty": "💄",
  "Toys": "🧸",
  "Home & Kitchen": "🏠",
};

export default function TopCategories() {
  const { categories, loading, error } = useCategories();

  // Show loading skeleton
  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-[22px] font-bold text-black text-center mb-8">
            Top Categories
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-full aspect-square bg-gray-200 rounded-[20px]"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Hide section if error or no categories
  if (error || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-[22px] font-bold text-black text-center mb-8">
          Top Categories
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug || cat.id}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-square bg-gradient-to-br from-[#E8D5C4] to-[#C9B5A0] rounded-[20px] overflow-hidden flex items-center justify-center p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={cat.imageUrl || cat.image || ''}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const emoji = fallbackEmojis[cat.name] || '📦';
                      parent.innerHTML = `<span class="text-5xl">${emoji}</span>`;
                    }
                  }}
                />
              </div>
              <span className="text-[13px] font-semibold text-black text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
