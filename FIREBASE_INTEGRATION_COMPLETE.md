# Firebase Integration Complete Guide

## Overview
Your multi-vendor ecommerce marketplace is now fully integrated with Firebase (Firestore + Authentication). Customers can browse products, add to cart, place orders, and leave reviews.

## ✅ Implemented Features

### 1. Customer Authentication
- **Registration**: New customers can register with email/password
- **Login**: Existing customers can log in
- **Logout**: Secure logout functionality
- **Session Management**: Persistent sessions using Firebase Auth
- **User Collection**: Automatic user document creation with role "customer"

**Files:**
- `src/contexts/AuthContext.tsx` - Authentication context provider
- `src/app/account/register/page.tsx` - Registration page
- `src/app/account/login/page.tsx` - Login page

### 2. Homepage Data Loading
**Collections Used:**
- `banners` - Hero slider banners
- `categories` - Product categories
- `products` - All products (filtered by status="approved")

**Features:**
- Banner slider with auto-rotation
- Top categories display
- Featured products
- Best selling products
- New arrivals

**Files:**
- `src/hooks/useBanners.ts` - Fetch banners
- `src/hooks/useCategories.ts` - Fetch categories
- `src/hooks/useProducts.ts` - Fetch products with filters
- `src/components/sections/hero-slider.tsx` - Banner slider

### 3. Category Navigation
**Route:** `/collections/[slug]`

**Features:**
- Fetch products by categoryId
- Filter by status="approved"
- Display category-specific products

**Files:**
- `src/app/collections/[slug]/page.tsx`

### 4. Product Details Page
**Route:** `/products/[id]`

**Features:**
- Single product fetch by ID
- Product images gallery
- Price display (with discount support)
- Stock availability
- Vendor information
- Add to cart functionality
- Product reviews section

**Files:**
- `src/app/products/[id]/page.tsx`
- `src/hooks/useProduct.ts` - Single product fetch

### 5. Cart System
**Collection:** `carts`

**Structure:**
```javascript
{
  userId: string,
  products: [
    {
      productId: string,
      name: string,
      price: number,
      quantity: number,
      image: string,
      vendorId: string
    }
  ],
  totalPrice: number,
  updatedAt: timestamp
}
```

**Features:**
- Add to cart (logged-in users only)
- Remove from cart
- Update quantity
- Clear cart
- Persistent cart storage in Firestore

**Files:**
- `src/contexts/CartContext.tsx` - Cart context provider
- `src/app/cart/page.tsx` - Cart page

### 6. Checkout System
**Route:** `/checkout`

**Features:**
- Shipping address form
- Payment method selection (COD/Online)
- Order summary
- Create order in Firestore

**Files:**
- `src/app/checkout/page.tsx`

### 7. Orders Collection
**Collection:** `orders`

**Structure:**
```javascript
{
  id: string,
  customerId: string,
  customerName: string,
  customerEmail: string,
  products: [
    {
      productId: string,
      name: string,
      price: number,
      quantity: number,
      image: string,
      vendorId: string
    }
  ],
  vendors: [string],
  totalAmount: number,
  paymentStatus: 'pending' | 'paid' | 'failed',
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  shippingAddress: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  createdAt: timestamp
}
```

**Features:**
- Create orders
- Fetch customer orders
- Display order history
- Order status tracking
- Payment status tracking

**Files:**
- `src/hooks/useOrders.ts`
- `src/app/orders/page.tsx`

### 8. Product Reviews
**Collection:** `reviews`

**Structure:**
```javascript
{
  productId: string,
  customerId: string,
  customerName: string,
  rating: number (1-5),
  review: string,
  createdAt: timestamp
}
```

**Features:**
- Add reviews (logged-in customers only)
- Display product reviews
- Calculate average rating
- Show rating count

**Files:**
- `src/hooks/useReviews.ts`
- Product details page includes review form

### 9. Search System
**Features:**
- Search by product name
- Search by description
- Search by category
- Client-side filtering for approved products

**Files:**
- `src/hooks/useSearch.ts`

## 📁 Firestore Collections Structure

### users
```javascript
{
  id: string,
  name: string,
  email: string,
  role: "customer",
  createdAt: timestamp
}
```

### products
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  discountPrice: number (optional),
  category: string,
  categoryId: string,
  images: [string],
  vendorId: string,
  vendorName: string,
  stock: number,
  status: "approved" | "pending" | "rejected",
  featured: boolean,
  bestSelling: boolean,
  newArrival: boolean,
  createdAt: timestamp
}
```

### categories
```javascript
{
  id: string,
  name: string,
  slug: string,
  description: string,
  image: string,
  icon: string,
  createdAt: timestamp
}
```

### banners
```javascript
{
  id: string,
  title: string,
  image: string,
  mobileImage: string (optional),
  link: string,
  createdAt: timestamp
}
```

### carts
```javascript
{
  userId: string,
  products: [CartItem],
  totalPrice: number,
  updatedAt: timestamp
}
```

### orders
```javascript
{
  id: string,
  customerId: string,
  customerName: string,
  customerEmail: string,
  products: [OrderItem],
  vendors: [string],
  totalAmount: number,
  paymentStatus: string,
  orderStatus: string,
  shippingAddress: object,
  createdAt: timestamp
}
```

### reviews
```javascript
{
  id: string,
  productId: string,
  customerId: string,
  customerName: string,
  rating: number,
  review: string,
  createdAt: timestamp
}
```

## 🔒 Security Rules
All security rules are configured in `firestore.rules`:

- **Public Read**: products, categories, banners, reviews
- **Authenticated Write**: carts (own cart only), orders (create only), reviews (create only)
- **Admin Only**: categories, banners management
- **Vendor Only**: product management (own products)

## 🎯 Usage Examples

### Fetch Products with Filters
```typescript
// Featured products
const { products } = useProducts({ featured: true, limitCount: 10 });

// Best selling products
const { products } = useProducts({ bestSelling: true, limitCount: 10 });

// Products by category
const { products } = useProducts({ categoryId: 'electronics', limitCount: 20 });

// New arrivals
const { products } = useProducts({ newArrival: true, limitCount: 10 });
```

### Add to Cart
```typescript
const { addToCart } = useCart();

await addToCart({
  productId: product.id,
  name: product.name,
  price: product.discountPrice || product.price,
  quantity: 1,
  image: product.images[0],
  vendorId: product.vendorId
});
```

### Create Order
```typescript
const { createOrder } = useOrders();

const orderId = await createOrder(
  cartItems,
  'COD',
  {
    street: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    country: 'India'
  }
);
```

### Add Review
```typescript
const { addReview } = useReviews(productId);

await addReview(productId, 5, 'Great product!');
```

## 🚀 Next Steps

1. **Add Sample Data**: Use Firebase Console or seed script to add:
   - Banners
   - Categories
   - Products
   - Test users

2. **Test User Flow**:
   - Register a new customer
   - Browse products
   - Add items to cart
   - Complete checkout
   - View orders
   - Leave a review

3. **Optional Enhancements**:
   - Add product search in header
   - Implement wishlist
   - Add order tracking
   - Email notifications
   - Payment gateway integration
   - Product filters (price range, ratings)

## 📝 Important Notes

1. All product queries automatically filter by `status="approved"`
2. Cart is only available for logged-in users
3. Orders start with `orderStatus="pending"` and `paymentStatus="pending"`
4. Reviews can only be added by logged-in customers
5. Firestore security rules enforce proper access control

## 🔧 Configuration Files

- `src/lib/firebase.ts` - Firebase initialization
- `firestore.rules` - Security rules
- `src/lib/firestore-helpers.ts` - Helper functions

## ✨ Key Features Summary

✅ Customer registration and authentication
✅ Browse products by category
✅ Product details with images and reviews
✅ Shopping cart with persistence
✅ Checkout with shipping address
✅ Order history and tracking
✅ Product reviews and ratings
✅ Search functionality
✅ Responsive design
✅ Security rules implemented

Your ecommerce marketplace is now fully functional and ready for customers!
