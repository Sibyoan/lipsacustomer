import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface InfluencerVideo {
  id: string;
  productId: string;
  productName: string;
  videoUrl: string;
  thumbnail: string;
  views: number;
  price: number;
  originalPrice: number;
  discount: number;
  createdAt: Date;
}

export function useInfluencerVideos(limitCount: number = 10) {
  const [videos, setVideos] = useState<InfluencerVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, [limitCount]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const videosRef = collection(db, 'influencerVideos');
      const q = query(
        videosRef,
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const videosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InfluencerVideo[];

      setVideos(videosData);
      setError(null);
    } catch (err) {
      console.error('Error fetching influencer videos:', err);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  // Format view count (3500 -> 3.5K)
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return { videos, loading, error, refetch: fetchVideos, formatViews };
}