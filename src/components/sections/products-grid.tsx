"use client";

import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

interface ProductsGridProps {
  category?: string;
  title?: string;
  limit?: number;
}

export default function ProductsGrid({ category, title = "Products", limit = 12 }: ProductsGridProps) {
  const { products, loading, error } = useProducts({ 
    categoryFilter: category, 
    limitCount: limit 
  });

  if (loading) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="text-center py-12">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="text-center py-12 text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="text-center py-12 text-gray-600">No products found</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#0b1726]">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
