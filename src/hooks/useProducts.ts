import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  categoryId?: string;
  categoryName?: string;
  categorySlug?: string;
  images: string[];
  vendorId: string;
  vendorName?: string;
  stock: number;
  status: string;
  featured?: boolean;
  bestSelling?: boolean;
  newArrival?: boolean;
  createdAt: Date;
}

interface UseProductsOptions {
  categoryId?: string;
  categorySlug?: string;
  categoryFilter?: string;
  featured?: boolean;
  bestSelling?: boolean;
  newArrival?: boolean;
  searchQuery?: string;
  limitCount?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const {
    categoryId,
    categorySlug,
    categoryFilter,
    featured,
    bestSelling,
    newArrival,
    searchQuery,
    limitCount = 20
  } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [categoryId, categorySlug, categoryFilter, featured, bestSelling, newArrival, searchQuery, limitCount]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      
      let q = query(
        productsRef,
        where('status', '==', 'approved')
      );

      // Add category filter - prioritize categorySlug over categoryId
      if (categorySlug) {
        q = query(q, where('categorySlug', '==', categorySlug));
      } else if (categoryId) {
        q = query(q, where('categoryId', '==', categoryId));
      } else if (categoryFilter) {
        q = query(q, where('category', '==', categoryFilter));
      }

      // Add feature filters
      if (featured) {
        q = query(q, where('featured', '==', true));
      }
      if (bestSelling) {
        q = query(q, where('bestSelling', '==', true));
      }
      if (newArrival) {
        q = query(q, where('newArrival', '==', true));
      }

      // Add ordering and limit
      q = query(q, orderBy('createdAt', 'desc'), limit(limitCount));

      const querySnapshot = await getDocs(q);
      let productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      // Client-side search filter if searchQuery provided
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        productsData = productsData.filter(product =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description?.toLowerCase().includes(lowerQuery) ||
          product.category?.toLowerCase().includes(lowerQuery)
        );
      }

      setProducts(productsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
}

// Get single product by ID
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    if (productDoc.exists()) {
      return {
        id: productDoc.id,
        ...productDoc.data()
      } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
