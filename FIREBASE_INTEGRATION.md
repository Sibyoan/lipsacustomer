# Firebase Integration Guide

## Overview
This document describes the Firebase integration for the customer-facing website of the multi-vendor ecommerce marketplace.

## Firebase Services Used

### 1. Firebase Authentication
- Customer registration and login
- Session persistence
- User profile management

### 2. Cloud Firestore
Collections used:
- `users` - Customer and user profiles
- `vendors` - Vendor profiles
- `products` - Product catalog
- `categories` - Product categories
- `banners` - Homepage banners
- `carts` - Shopping carts
- `orders` - Customer orders
- `reviews` - Product reviews
- `returns` - Return requests
- `coupons` - Discount coupons
- `payoutRequests` - Vendor payout requests
- `settings` - Application settings

### 3. Cloudinary
- Product images
- Banner images
- Category images
- User profile images

## Firestore Data Structure

### Users Collection
```javascript
{
  id: string,
  name: string,
  email: string,
  role: "customer",
  createdAt: Date
}
```

### Products Collection
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  discountPrice: number (optional),
  category: string,
  images: string[],
  vendorId: string,
  stock: number,
  status: "approved" | "pending" | "rejected",
  createdAt: Date
}
```

### Categories Collection
```javascript
{
  id: string,
  name: string,
  image: string,
  createdAt: Date
}
```

### Banners Collection
```javascript
{
  id: string,
  title: string,
  image: string,
  link: string,
  createdAt: Date
}
```

### Carts Collection
```javascript
{
  userId: string,
  products: [{
    productId: string,
    name: string,
    price: number,
    quantity: number,
    image: string
  }],
  totalPrice: number,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  id: string,
  customerId: string,
  products: [{
    productId: string,
    name: string,
    price: number,
    quantity: number,
    image: string
  }],
  totalPrice: number,
  paymentMethod: "cod" | "online",
  status: "pending" | "processing" | "completed" | "cancelled",
  createdAt: Date
}
```

### Reviews Collection
```javascript
{
  id: string,
  productId: string,
  customerId: string,
  customerName: string (optional),
  rating: number (1-5),
  review: string,
  createdAt: Date
}
```

## Implementation Details

### Context Providers

#### AuthContext (`src/contexts/AuthContext.tsx`)
Manages user authentication state and provides:
- `user` - Current Firebase user
- `userData` - User profile data from Firestore
- `loading` - Authentication loading state
- `register(email, password, name)` - Register new user
- `login(email, password)` - Login user
- `logout()` - Logout user

#### CartContext (`src/contexts/CartContext.tsx`)
Manages shopping cart state and provides:
- `cart` - Array of cart items
- `loading` - Cart loading state
- `addToCart(product)` - Add item to cart
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Clear all items
- `getTotalPrice()` - Calculate total price

### Custom Hooks

#### useProducts (`src/hooks/useProducts.ts`)
Fetches products from Firestore with optional category filter.

#### useCategories (`src/hooks/useCategories.ts`)
Fetches all categories from Firestore.

#### useBanners (`src/hooks/useBanners.ts`)
Fetches homepage banners from Firestore.

#### useOrders (`src/hooks/useOrders.ts`)
Manages customer orders:
- Fetch user's order history
- Create new orders

#### useReviews (`src/hooks/useReviews.ts`)
Manages product reviews:
- Fetch reviews for a product
- Submit new reviews

## Pages

### Authentication Pages
- `/account/login` - Customer login
- `/account/register` - Customer registration

### Shopping Pages
- `/` - Homepage with products
- `/products/[id]` - Product details page
- `/collections/[slug]` - Category collection page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history

## Components

### ProductCard (`src/components/ProductCard.tsx`)
Displays product information in a card format.

### ProductsGrid (`src/components/sections/products-grid.tsx`)
Grid layout for displaying multiple products.

### Header (`src/components/sections/header.tsx`)
Updated with:
- User authentication status
- Cart item count
- User menu with logout

## Security Rules (Current Production Rules)

Your Firestore rules support a multi-vendor marketplace with the following access controls:

### User Roles
- **Admin**: Full access to all collections
- **Vendor**: Can manage their own products and view their orders
- **Customer**: Can browse products, manage cart, place orders, and write reviews

### Key Rules

#### Users Collection
- All authenticated users can read user profiles
- Users can update their own profile
- Only admins can delete users

#### Vendors Collection
- All authenticated users can read vendor profiles
- Vendors can create and update their own profile
- Only admins can delete vendors

#### Products Collection
- Anyone can read products (public browsing)
- Only approved vendors can create products
- Vendors can update/delete their own products
- Admins have full access

#### Categories, Banners, Coupons, Settings
- Anyone can read
- Only admins can write

#### Carts Collection
- Users can only access their own cart
- Complete privacy for shopping carts

#### Orders Collection
- Customers can read their own orders
- Vendors can read orders containing their products
- Customers can create orders for themselves
- Vendors can update order status for their products
- Admins have full access

#### Reviews Collection
- Anyone can read reviews
- Authenticated users can create reviews
- Users can only edit/delete their own reviews
- Admins can delete any review

#### Returns Collection
- Customers can read their own returns
- Customers can create return requests
- Only admins can update/delete returns

#### Payout Requests Collection
- Vendors can read their own payout requests
- Vendors can create payout requests
- Only admins can update/delete payout requests

### Complete Rules

The complete rules are in the `firestore.rules` file. To apply them:

1. Go to Firebase Console → Firestore Database → Rules
2. Copy content from `firestore.rules`
3. Paste and click "Publish"

## Usage Examples

### Register a New User
```typescript
import { useAuth } from '@/contexts/AuthContext';

const { register } = useAuth();
await register('user@example.com', 'password123', 'John Doe');
```

### Add Product to Cart
```typescript
import { useCart } from '@/contexts/CartContext';

const { addToCart } = useCart();
await addToCart({
  productId: 'prod123',
  name: 'Product Name',
  price: 299,
  quantity: 1,
  image: 'https://...'
});
```

### Fetch Products by Category
```typescript
import { useProducts } from '@/hooks/useProducts';

const { products, loading, error } = useProducts('electronics', 20);
```

### Place an Order
```typescript
import { useOrders } from '@/hooks/useOrders';
import { useCart } from '@/contexts/CartContext';

const { createOrder } = useOrders();
const { cart, getTotalPrice, clearCart } = useCart();

const orderId = await createOrder(cart, getTotalPrice(), 'cod');
await clearCart();
```

## Testing

To test the integration:

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000`

3. Test the following flows:
   - Register a new account
   - Login with credentials
   - Browse products on homepage
   - View product details
   - Add products to cart
   - View cart
   - Proceed to checkout
   - Place an order
   - View order history
   - Submit a product review

## Notes

- All Firebase operations are client-side
- Authentication state persists across page reloads
- Cart data is synced with Firestore for logged-in users
- Only approved products (status = "approved") are displayed
- Product images should be uploaded to Firebase Storage
- Error handling is implemented for all Firebase operations
