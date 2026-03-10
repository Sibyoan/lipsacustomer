import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from './useProducts';

export function useProduct(productId: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      const productDoc = await getDoc(doc(db, 'products', productId));
      
      if (productDoc.exists()) {
        setProduct({
          id: productDoc.id,
          ...productDoc.data()
        } as Product);
        setError(null);
      } else {
        setError('Product not found');
        setProduct(null);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, refetch: fetchProduct };
}
