# Firebase Architecture Overview

## Firebase Integration Summary

Your Next.js application is fully integrated with Firebase across all pages and components. Here's how everything connects:

## Core Firebase Setup

### Configuration (`src/lib/firebase.ts`)
- Initializes Firebase app with project credentials
- Exports Firebase services: `auth`, `db` (Firestore), `storage`, `analytics`
- Prevents multiple initializations with singleton pattern
- Analytics only loads in browser environment

## Global Context Providers

### Root Layout (`src/app/layout.tsx`)
All pages are wrapped with Firebase context providers:
```
AuthProvider → CartProvider → All Pages
```

### AuthContext (`src/contexts/AuthContext.tsx`)
- Manages user authentication state globally
- Provides: `user`, `userData`, `register()`, `login()`, `logout()`
- Automatically syncs with Firebase Auth
- Fetches user profile from Firestore `users` collection
- Available on every page via `useAuth()` hook

### CartContext (`src/contexts/CartContext.tsx`)
- Manages shopping cart state with Firestore sync
- Stores cart data in `carts` collection (keyed by user ID)
- Provides: `cart`, `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`
- Automatically loads/saves cart when user logs in/out
- Available on every page via `useCart()` hook

## Firebase Data Hooks

Every page can access these custom hooks that connect to Firestore:

### 1. `useBanners()` - Banner Management
- Collection: `banners`
- Fetches hero slider banners with ordering
- Supports desktop/mobile images
- Auto-filters inactive banners

### 2. `useProducts()` - Product Catalog
- Collection: `products`
- Filters: category, featured, bestSelling, newArrival, search
- Only shows approved products
- Includes `getProductById()` helper

### 3. `useCategories()` - Category Data
- Collection: `categories`
- Fetches all product categories
- Includes `getCategoryById()` and `getCategoryBySlug()` helpers

### 4. `useOrders()` - Order Management
- Collection: `orders`
- User-specific order history
- `createOrder()` function for checkout
- `getOrderById()` helper

### 5. `useProduct()` - Single Product Details
- Fetches individual product data
- Used on product detail pages

### 6. `useReviews()` - Product Reviews
- Collection: `reviews`
- Product-specific review fetching

### 7. `useSearch()` - Search Functionality
- Client-side search across products

## Page-Level Firebase Usage

### Home Page (`src/app/page.tsx`)
- Uses `useBanners()` for hero slider
- Uses `useProducts()` for featured/bestselling sections
- Uses `useCategories()` for category display

### Product Pages (`src/app/products/[id]/page.tsx`)
- Uses `useProduct()` for product details
- Uses `useReviews()` for product reviews
- Uses `useCart()` for add-to-cart functionality

### Collection Pages (`src/app/collections/[slug]/page.tsx`)
- Uses `useProducts()` with category filter
- Uses `useCategories()` for category info

### Cart Page (`src/app/cart/page.tsx`)
- Uses `useCart()` for cart management
- Real-time sync with Firestore

### Checkout Page (`src/app/checkout/page.tsx`)
- Uses `useCart()` for order items
- Uses `useOrders()` to create orders
- Uses `useAuth()` for customer info

### Orders Page (`src/app/orders/page.tsx`)
- Uses `useOrders()` for order history
- Protected by auth state

### Account Pages
- **Login** (`src/app/account/login/page.tsx`): Uses `useAuth()` for authentication
- **Register** (`src/app/account/register/page.tsx`): Uses `useAuth()` for registration
- **Profile** (`src/app/account/profile/page.tsx`): Uses `useAuth()` for user data

### Search Page (`src/app/search/page.tsx`)
- Uses `useSearch()` or `useProducts()` with search filter

## Component-Level Firebase Usage

### Header (`src/components/sections/header.tsx`)
- Uses `useAuth()` for user state
- Uses `useCart()` for cart count badge

### Product Card (`src/components/ProductCard.tsx`)
- Uses `useCart()` for quick add-to-cart

### Various Section Components
- All sections can access auth/cart context
- Some fetch data via hooks (banners, products, categories)

## Firestore Collections Structure

```
firestore/
├── users/              # User profiles
├── products/           # Product catalog
├── categories/         # Product categories
├── banners/            # Homepage banners
├── carts/              # User shopping carts
├── orders/             # Order history
├── reviews/            # Product reviews
└── vendors/            # Vendor information
```

## Security Rules

Your Firestore security rules are defined in:
- `firestore.rules` (current)
- `firestore.rules.updated` (updated version)

## Key Features

1. **Universal Access**: Every page has access to Firebase through context providers
2. **Real-time Sync**: Cart and auth state sync automatically
3. **Optimized Loading**: Hooks handle loading/error states
4. **Type Safety**: TypeScript interfaces for all data models
5. **Reusable Logic**: Custom hooks prevent code duplication
6. **SSR Compatible**: Proper client-side initialization for Next.js

## How to Use Firebase on Any Page

```typescript
// In any component/page:
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/hooks/useProducts';

export default function MyPage() {
  const { user, login, logout } = useAuth();
  const { cart, addToCart } = useCart();
  const { products, loading } = useProducts({ featured: true });
  
  // Your component logic
}
```

## Environment Variables

Make sure these are set in `.env.local`:
- Firebase config is hardcoded in `firebase.ts` (consider moving to env vars for security)

## Next Steps

1. Move Firebase config to environment variables
2. Add error boundaries for Firebase errors
3. Implement offline persistence
4. Add Firebase Analytics tracking
5. Set up Firebase Performance Monitoring
