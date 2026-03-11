import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Banner {
  id: string;
  title: string;
  image: string;
  mobileImage?: string; // Optional mobile-specific image
  link: string;
  createdAt: Date;
  position: number; // For custom ordering
}

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const bannersRef = collection(db, 'banners');
      const q = query(bannersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const bannersData = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          // Support both 'image' and 'imageUrl' field names
          const imageUrl = data.image || data.imageUrl || '';
          
          // Only include banners with valid image URLs
          if (!imageUrl || imageUrl.trim() === '') {
            console.warn(`Banner ${doc.id} has no valid image URL, skipping`);
            return null;
          }
          
          // Skip inactive banners if isActive field exists
          if (data.isActive !== undefined && !data.isActive) {
            console.log(`Banner ${doc.id} is inactive, skipping`);
            return null;
          }
          
          // Validate and sanitize the link
          let validLink = data.link || '/';
          
          // Check if link is invalid and provide a better default
          if (!validLink || 
              validLink.trim() === '' || 
              validLink.includes('cloudinary.com') || 
              validLink.includes('heeeeee') ||
              (!validLink.startsWith('/') && !validLink.startsWith('http'))) {
            validLink = '/'; // Default to home page
          }
          
          return {
            id: doc.id,
            title: data.title || 'Banner',
            image: imageUrl,
            mobileImage: data.mobileImage || data.mobileImageUrl || null,
            link: validLink,
            createdAt: data.createdAt?.toDate() || new Date(),
            position: data.position || 0
          };
        })
        .filter(banner => banner !== null) as Banner[];

      // Sort by position if available, otherwise by createdAt
      bannersData.sort((a, b) => {
        if (a.position !== b.position) {
          return a.position - b.position;
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

      setBanners(bannersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError('Failed to load banners');
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  return { banners, loading, error, refetch: fetchBanners };
}
