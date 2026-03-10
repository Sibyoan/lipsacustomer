import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, orderBy, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendorId: string; // Required - not optional
  product: {
    name: string;
    price: number;
    image: string;
    category: string;
  };
}


export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  productId: string;
  customerName?: string;
  customerEmail?: string;
  products: OrderItem[];
  vendors: string[]; // Make vendors required (not optional)
  quantity: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  totalAmount: number;
  totalPrice: number;
  paymentMethod?: string;
  orderStatus?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
}

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef,
        where('customerId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Order data from Firestore:', data); // Debug log
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          paymentMethod: typeof data.paymentMethod === 'object' ? 'COD' : data.paymentMethod,
          totalPrice: data.totalPrice || data.totalAmount || 0,
          totalAmount: data.totalAmount || data.totalPrice || 0
        };
      }) as Order[];

      setOrders(ordersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (
      products: Order['products'],
      totalPrice: number,
      paymentMethod: string,
      customerName?: string,
      shippingAddress?: Order['shippingAddress']
    ) => {
      if (!user) throw new Error('User must be logged in');

      // Validate that all products have vendorId
      const productsWithoutVendor = products.filter(p => !p.vendorId || p.vendorId.trim() === '');
      if (productsWithoutVendor.length > 0) {
        console.error('Products without vendorId:', productsWithoutVendor);
        throw new Error('Some products are missing vendor information. Please try again.');
      }

      // Extract unique vendor IDs from products
      const vendors = [...new Set(products.map(p => p.vendorId).filter(Boolean))] as string[];
      
      if (vendors.length === 0) {
        throw new Error('No valid vendors found for this order');
      }

      // Fetch the real customer name from Firestore users collection
      let realCustomerName = customerName || 'Customer';
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          realCustomerName = userData.name || userData.displayName || user.displayName || user.email || 'Customer';
        }
      } catch (error) {
        console.error('Error fetching user data for order:', error);
        // Fallback to provided customerName or user properties
        realCustomerName = customerName || user.displayName || user.email || 'Customer';
      }

      const orderData = {
        customerId: user.uid,
        vendorId: vendors[0], // Primary vendor (for single vendor orders)
        productId: products[0]?.productId || '', // Primary product ID
        customerName: realCustomerName,
        customerEmail: user.email || '',
        products,
        vendors,
        quantity: products.reduce((sum, p) => sum + p.quantity, 0),
        totalAmount: totalPrice,
        totalPrice,
        paymentMethod,
        paymentStatus: (paymentMethod === 'cod' ? 'pending' : 'pending') as 'pending' | 'paid' | 'failed',
        orderStatus: 'pending' as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
        status: 'pending' as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
        shippingAddress,
        createdAt: serverTimestamp()
      };

      console.log('Creating order with data:', orderData); // Debug log

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      await fetchOrders();
      return docRef.id;
    }

  const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      if (orderDoc.exists()) {
        const data = orderDoc.data();
        return {
          id: orderDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          paymentMethod: typeof data.paymentMethod === 'object' ? 'COD' : data.paymentMethod,
          totalPrice: data.totalPrice || data.totalAmount || 0,
          totalAmount: data.totalAmount || data.totalPrice || 0
        } as Order;
      }
      return null;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  return { orders, loading, error, createOrder, getOrderById, refetch: fetchOrders };
}
