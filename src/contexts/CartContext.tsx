"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendorId: string; // Add vendorId to cart items
  product: {
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      const cartDoc = await getDoc(doc(db, 'carts', user.uid));
      if (cartDoc.exists()) {
        setCart(cartDoc.data().products || []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async (updatedCart: CartItem[]) => {
    if (!user) return;
    
    const totalPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    await setDoc(doc(db, 'carts', user.uid), {
      userId: user.uid,
      products: updatedCart,
      totalPrice,
      updatedAt: new Date()
    });
  };

  const addToCart = async (product: CartItem) => {
    const existingItem = cart.find(item => item.productId === product.productId);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
    } else {
      updatedCart = [...cart, product];
    }
    
    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const removeFromCart = async (productId: string) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const clearCart = async () => {
    setCart([]);
    if (user) {
      await saveCart([]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
