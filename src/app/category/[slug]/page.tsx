"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import UtilityBar from '@/components/sections/utility-bar';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useProducts } from '@/hooks/useProducts';
import { getCategoryBySlug, type Category } from '@/hooks/useCategories';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryNotFound, setCategoryNotFound] = useState(false);
  
  // Fetch category information
  useEffect(() => {
    async function loadCategory() {
      try {
        setCategoryLoading(true);
        const cat = await getCategoryBySlug(slug);
        
        if (cat) {
          setCategory(cat);
          setCategoryNotFound(false);
        } else {
          // Create a fallback category from slug
          setCategory({
            id: slug,
            name: slug.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            slug: slug,
            createdAt: new Date()
          });
          setCategoryNotFound(false);
        }
      } catch (error) {
        console.error('Error loading category:', error);
        setCategoryNotFound(true);
      } finally {
        setCategoryLoading(false);
      }
    }
    
    loadCategory();
  }, [slug]);
  
  // Fetch products using categorySlug with proper filtering
  const { products, loading: productsLoading, error: productsError } = useProducts({ 
    categorySlug: slug,
    limitCount: 50 
  });

  // Show loading state
  if (categoryLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <UtilityBar />
        <Header />
        <main className="grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#d72323] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading category...</p>
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
      <main className="grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#d72323]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category?.name || slug}</span>
          </nav>
          
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#0b1726] mb-2">
              {category?.name || slug}
            </h1>
            {category?.description && (
              <p className="text-gray-600 text-lg">{category.description}</p>
            )}
          </div>
          
          {/* Products Loading State */}
          {productsLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#d72323] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Products Error State */}
          {productsError && (
            <div className="text-center py-12">
              <p className="text-red-600">{productsError}</p>
            </div>
          )}

          {/* No Products Found - Only show if no approved products exist */}
          {!productsLoading && !productsError && products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Products Yet</h2>
              <p className="text-gray-600 mb-6">
                There are no approved products in this category at the moment.
              </p>
              <Link 
                href="/" 
                className="inline-block text-[#d72323] hover:underline"
              >
                Browse other categories
              </Link>
            </div>
          )}

          {/* Products Grid */}
          {!productsLoading && !productsError && products.length > 0 && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {products.length} approved product{products.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
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