import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  icon?: string;
  productCount?: number;
  createdAt: Date;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesRef = collection(db, 'categories');
      const q = query(categoriesRef, orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const categoriesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Support both 'image' and 'imageUrl' field names
          image: data.image || data.imageUrl,
          imageUrl: data.imageUrl || data.image
        };
      }) as Category[];

      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
}

// Get single category by ID
export async function getCategoryById(categoryId: string): Promise<Category | null> {
  try {
    const categoryDoc = await getDoc(doc(db, 'categories', categoryId));
    if (categoryDoc.exists()) {
      return {
        id: categoryDoc.id,
        ...categoryDoc.data()
      } as Category;
    }
    return null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categoriesRef = collection(db, 'categories');
    
    // Check if slug looks like a Firebase ID (long alphanumeric string)
    const isFirebaseId = slug.length > 15 && /^[a-zA-Z0-9]+$/.test(slug);
    
    if (isFirebaseId) {
      // If it's a Firebase ID, get the document directly
      const categoryDoc = await getDoc(doc(db, 'categories', slug));
      if (categoryDoc.exists()) {
        const data = categoryDoc.data();
        return {
          id: categoryDoc.id,
          ...data,
          image: data.image || data.imageUrl || '',
          slug: data.slug || categoryDoc.id
        } as Category;
      }
    } else {
      // If it's a slug, search through all categories
      const querySnapshot = await getDocs(categoriesRef);
      
      // First try to find by slug field
      let category = querySnapshot.docs.find(doc => doc.data().slug === slug);
      
      // If not found, try to find by document ID
      if (!category) {
        category = querySnapshot.docs.find(doc => doc.id === slug);
      }
      
      if (category) {
        const data = category.data();
        return {
          id: category.id,
          ...data,
          image: data.image || data.imageUrl || '',
          slug: data.slug || category.id
        } as Category;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}
