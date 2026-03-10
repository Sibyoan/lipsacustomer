import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, orderBy, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  customerId: string;
  customerName: string;
  vendorId: string;
  productName: string;
  productImage: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt?: Date;
}


export interface CreateReturnData {
  orderId: string;
  productId: string;
  customerId: string;
  vendorId: string;
  reason: string;
  status: 'pending';
}

export function useReturns() {
  const { user } = useAuth();
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchReturns();
    } else {
      setReturns([]);
      setLoading(false);
    }
  }, [user]);

  const fetchReturns = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const returnsRef = collection(db, 'returns');
      const q = query(
        returnsRef,
        where('customerId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const returnsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : (data.updatedAt ? new Date(data.updatedAt) : undefined)
        };
      }) as ReturnRequest[];

      setReturns(returnsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching returns:', err);
      setError('Failed to load return requests');
    } finally {
      setLoading(false);
    }
  };

  const createReturn = async (returnData: CreateReturnData) => {
    if (!user) throw new Error('User must be logged in');

    try {
      // Fetch customer details
      const userDoc = await getDoc(doc(db, 'users', returnData.customerId));
      const customerName = userDoc.exists() ? 
        (userDoc.data().name || userDoc.data().displayName || 'Customer') : 
        'Customer';

      // Fetch product details
      const productDoc = await getDoc(doc(db, 'products', returnData.productId));
      const productData = productDoc.exists() ? productDoc.data() : null;
      const productName = productData?.name || 'Unknown Product';
      const productImage = productData?.images?.[0] || productData?.image || '';

      // Create return document with full details
      const returnDocData = {
        ...returnData,
        customerName,
        productName,
        productImage,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'returns'), returnDocData);
      
      await fetchReturns(); // Refresh the list
      return docRef.id;
    } catch (error) {
      console.error('Error creating return request:', error);
      throw error;
    }
  };

  const updateReturnStatus = async (returnId: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'returns', returnId), {
        status,
        updatedAt: serverTimestamp()
      });
      
      await fetchReturns(); // Refresh the list
    } catch (error) {
      console.error('Error updating return status:', error);
      throw error;
    }
  };

  return { 
    returns, 
    loading, 
    error, 
    createReturn, 
    updateReturnStatus, 
    refetch: fetchReturns 
  };
}