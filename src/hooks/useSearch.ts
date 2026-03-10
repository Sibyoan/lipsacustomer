import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from './useProducts';

export function useSearch() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchTerm: string, categoryFilter?: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      
      // Fetch all approved products
      let q = query(productsRef, where('status', '==', 'approved'));
      
      if (categoryFilter) {
        q = query(
          productsRef,
          where('status', '==', 'approved'),
          where('category', '==', categoryFilter)
        );
      }

      const querySnapshot = await getDocs(q);
      const allProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      // Filter by search term (case-insensitive)
      const searchLower = searchTerm.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower)
      );

      setResults(filtered);
      setError(null);
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return { results, loading, error, search, clearResults };
}
