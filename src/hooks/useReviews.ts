import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName?: string;
  rating: number;
  review: string;
  createdAt: Date;
}

export function useReviews(productId?: string) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      const reviewsRef = collection(db, 'reviews');
      const q = query(
        reviewsRef,
        where('productId', '==', productId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];

      setReviews(reviewsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (productId: string, rating: number, reviewText: string) => {
    if (!user) throw new Error('User must be logged in');

    const reviewData = {
      productId,
      customerId: user.uid,
      customerName: user.displayName || 'Anonymous',
      rating,
      review: reviewText,
      createdAt: new Date()
    };

    await addDoc(collection(db, 'reviews'), reviewData);
    await fetchReviews();
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingCount = () => reviews.length;

  return { reviews, loading, error, addReview, getAverageRating, getRatingCount, refetch: fetchReviews };
}
