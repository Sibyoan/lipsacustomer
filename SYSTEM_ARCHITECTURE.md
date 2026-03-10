# System Architecture - Firebase Integration

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CUSTOMER WEBSITE                         │
│                        (Next.js + React)                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
        ┌───────────────────┐     ┌──────────────────┐
        │  Firebase Auth    │     │    Firestore     │
        │  (Authentication) │     │    (Database)    │
        └───────────────────┘     └──────────────────┘
                │                          │
                │                          │
                ▼                          ▼
        ┌───────────────┐         ┌──────────────────┐
        │ User Sessions │         │   Collections:   │
        │ JWT Tokens    │         │   - users        │
        │ Persistence   │         │   - products     │
        └───────────────┘         │   - categories   │
                                  │   - banners      │
                                  │   - carts        │
                                  │   - orders       │
                                  │   - reviews      │
                                  └──────────────────┘
```

## 📊 Data Flow Diagrams

### 1. Authentication Flow

```
┌──────────┐         ┌──────────────┐         ┌──────────────┐
│  User    │────────▶│ Register/    │────────▶│ Firebase     │
│          │         │ Login Page   │         │ Auth         │
└──────────┘         └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ AuthContext  │◀────────│ User Token   │
                     │ (State)      │         │ & Session    │
                     └──────────────┘         └──────────────┘
                            │
                            │
                            ▼
                     ┌──────────────┐
                     │ Firestore    │
                     │ users        │
                     │ collection   │
                     └──────────────┘
```

### 2. Product Browsing Flow

```
┌──────────┐         ┌──────────────┐         ┌──────────────┐
│ Homepage │────────▶│ useProducts  │────────▶│ Firestore    │
│          │         │ Hook         │         │ Query        │
└──────────┘         └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ Filter by:   │◀────────│ products     │
                     │ - status     │         │ where        │
                     │ - category   │         │ status =     │
                     │ - featured   │         │ "approved"   │
                     └──────────────┘         └──────────────┘
                            │
                            │
                            ▼
                     ┌──────────────┐
                     │ Display      │
                     │ Products     │
                     └──────────────┘
```

### 3. Shopping Cart Flow

```
┌──────────┐         ┌──────────────┐         ┌──────────────┐
│ Product  │────────▶│ Add to Cart  │────────▶│ CartContext  │
│ Page     │         │ Button       │         │ (State)      │
└──────────┘         └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ Check Auth   │         │ Update       │
                     │ Status       │         │ Local State  │
                     └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ Firestore    │◀────────│ Save to      │
                     │ carts/{uid}  │         │ Firestore    │
                     └──────────────┘         └──────────────┘
```

### 4. Checkout & Order Flow

```
┌──────────┐         ┌──────────────┐         ┌──────────────┐
│ Cart     │────────▶│ Checkout     │────────▶│ Select       │
│ Page     │         │ Page         │         │ Payment      │
└──────────┘         └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ Place Order  │────────▶│ Create Order │
                     │ Button       │         │ in Firestore │
                     └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ Clear Cart   │         │ Redirect to  │
                     │ from         │         │ Orders Page  │
                     │ Firestore    │         │              │
                     └──────────────┘         └──────────────┘
```

### 5. Review System Flow

```
┌──────────┐         ┌──────────────┐         ┌──────────────┐
│ Product  │────────▶│ Write Review │────────▶│ Check Auth   │
│ Page     │         │ Button       │         │ Status       │
└──────────┘         └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ Review Form  │────────▶│ Submit       │
                     │ (Rating +    │         │ Review       │
                     │  Text)       │         │              │
                     └──────────────┘         └──────────────┘
                            │                         │
                            │                         │
                            ▼                         ▼
                     ┌──────────────┐         ┌──────────────┐
                     │ Save to      │────────▶│ Display on   │
                     │ Firestore    │         │ Product Page │
                     │ reviews      │         │              │
                     └──────────────┘         └──────────────┘
```

## 🔄 Component Hierarchy

```
App (layout.tsx)
│
├── AuthProvider (AuthContext)
│   └── CartProvider (CartContext)
│       │
│       ├── Homepage (/)
│       │   ├── UtilityBar
│       │   ├── Header
│       │   ├── HeroSlider (useBanners)
│       │   ├── TopCategories (useCategories)
│       │   ├── FeaturedProducts (useProducts)
│       │   ├── BestSelling (useProducts)
│       │   ├── NewArrivals (useProducts)
│       │   └── Footer
│       │
│       ├── Category Page (/collections/[slug])
│       │   ├── Header
│       │   ├── ProductGrid (useProducts)
│       │   │   └── ProductCard (multiple)
│       │   └── Footer
│       │
│       ├── Product Page (/products/[id])
│       │   ├── Header
│       │   ├── ProductDetails
│       │   │   ├── ImageGallery
│       │   │   ├── ProductInfo
│       │   │   └── AddToCart (useCart)
│       │   ├── Reviews (useReviews)
│       │   │   ├── ReviewList
│       │   │   └── ReviewForm
│       │   └── Footer
│       │
│       ├── Cart Page (/cart)
│       │   ├── Header
│       │   ├── CartItems (useCart)
│       │   ├── OrderSummary
│       │   └── Footer
│       │
│       ├── Checkout Page (/checkout)
│       │   ├── Header
│       │   ├── OrderSummary
│       │   ├── PaymentMethod
│       │   ├── PlaceOrder (useOrders)
│       │   └── Footer
│       │
│       ├── Orders Page (/orders)
│       │   ├── Header
│       │   ├── OrderList (useOrders)
│       │   │   └── OrderCard (multiple)
│       │   └── Footer
│       │
│       ├── Login Page (/account/login)
│       │   ├── Header
│       │   ├── LoginForm (useAuth)
│       │   └── Footer
│       │
│       ├── Register Page (/account/register)
│       │   ├── Header
│       │   ├── RegisterForm (useAuth)
│       │   └── Footer
│       │
│       └── Profile Page (/account/profile)
│           ├── Header
│           ├── ProfileInfo (useAuth)
│           └── Footer
```

## 🗄️ Firestore Collections Relationships

```
users (collection)
├── {userId} (document)
    ├── id: string
    ├── name: string
    ├── email: string
    ├── role: "customer"
    └── createdAt: timestamp

products (collection)
├── {productId} (document)
    ├── id: string
    ├── name: string
    ├── categoryId: string ──────┐
    ├── vendorId: string         │
    ├── status: "approved"       │
    └── ...                      │
                                 │
categories (collection)          │
├── {categoryId} (document) ◄────┘
    ├── id: string
    ├── name: string
    └── ...

carts (collection)
├── {userId} (document) ◄────────┐
    ├── userId: string           │
    ├── products: [              │
    │   {                        │
    │     productId: string ─────┼──┐
    │     ...                    │  │
    │   }                        │  │
    └── ]                        │  │
                                 │  │
orders (collection)              │  │
├── {orderId} (document)         │  │
    ├── customerId: string ──────┘  │
    ├── products: [                 │
    │   {                           │
    │     productId: string ────────┘
    │     ...
    │   }
    └── ]

reviews (collection)
├── {reviewId} (document)
    ├── productId: string ───────┐
    ├── customerId: string       │
    └── ...                      │
                                 │
products (collection)            │
├── {productId} (document) ◄─────┘
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Client Application                    │
│                  (Next.js Frontend)                      │
└─────────────────────────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Firebase Authentication                 │
│              (JWT Token Verification)                    │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Authenticated Request
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Firestore Security Rules                │
│                                                          │
│  ✓ Check user authentication                            │
│  ✓ Verify user role                                     │
│  ✓ Validate document ownership                          │
│  ✓ Check field-level permissions                        │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Authorized Request
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Firestore Database                    │
│                  (Data Storage)                          │
└─────────────────────────────────────────────────────────┘
```

## 📱 State Management

```
┌─────────────────────────────────────────────────────────┐
│                    React Context API                     │
└─────────────────────────────────────────────────────────┘
                         │
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
┌──────────────────┐           ┌──────────────────┐
│  AuthContext     │           │  CartContext     │
│                  │           │                  │
│  - user          │           │  - cart          │
│  - userData      │           │  - loading       │
│  - loading       │           │  - addToCart     │
│  - register()    │           │  - removeFromCart│
│  - login()       │           │  - updateQuantity│
│  - logout()      │           │  - clearCart()   │
└──────────────────┘           └──────────────────┘
        │                                 │
        │                                 │
        ▼                                 ▼
┌──────────────────┐           ┌──────────────────┐
│ Firebase Auth    │           │ Firestore        │
│ (Backend)        │           │ carts collection │
└──────────────────┘           └──────────────────┘
```

## 🔄 Custom Hooks Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Custom Hooks                        │
└─────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ useProducts  │  │ useOrders    │  │ useReviews   │
│              │  │              │  │              │
│ - products   │  │ - orders     │  │ - reviews    │
│ - loading    │  │ - loading    │  │ - loading    │
│ - error      │  │ - error      │  │ - error      │
│ - refetch()  │  │ - create()   │  │ - addReview()│
└──────────────┘  └──────────────┘  └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    Firestore     │
                │   Collections    │
                └──────────────────┘
```

## 🚀 Request Flow Example: Add to Cart

```
1. User clicks "Add to Cart" button
   │
   ▼
2. Check if user is authenticated (AuthContext)
   │
   ├─ Not authenticated ──▶ Redirect to /account/login
   │
   └─ Authenticated
      │
      ▼
3. Call addToCart() from CartContext
   │
   ▼
4. Update local state (React State)
   │
   ▼
5. Save to Firestore carts/{userId}
   │
   ├─ Check Firestore rules
   │  │
   │  ├─ Verify user owns cart document
   │  │
   │  └─ Allow write
   │
   ▼
6. Firestore saves data
   │
   ▼
7. Return success
   │
   ▼
8. Show success message to user
   │
   ▼
9. Cart icon updates with new count
```

## 📊 Performance Optimization Points

```
┌─────────────────────────────────────────────────────────┐
│                    Optimization Layers                   │
└─────────────────────────────────────────────────────────┘

1. Client-Side Caching
   ├── React State (in-memory)
   ├── Context API (shared state)
   └── Browser LocalStorage (persistence)

2. Firestore Optimization
   ├── Composite Indexes (fast queries)
   ├── Query Limits (reduce reads)
   ├── Where Clauses (filter early)
   └── OrderBy (sorted results)

3. Network Optimization
   ├── HTTPS/2 (multiplexing)
   ├── CDN for static assets
   ├── Image optimization
   └── Code splitting

4. React Optimization
   ├── useMemo (expensive calculations)
   ├── useCallback (function memoization)
   ├── React.memo (component memoization)
   └── Lazy loading (code splitting)
```

## 🔍 Monitoring & Debugging

```
┌─────────────────────────────────────────────────────────┐
│                    Monitoring Stack                      │
└─────────────────────────────────────────────────────────┘

1. Firebase Console
   ├── Authentication (user activity)
   ├── Firestore (data operations)
   ├── Usage & Billing (costs)
   └── Performance (metrics)

2. Browser DevTools
   ├── Console (errors & logs)
   ├── Network (API calls)
   ├── Application (storage)
   └── Performance (profiling)

3. Error Tracking
   ├── Try/Catch blocks
   ├── Error boundaries
   ├── Console logging
   └── User feedback
```

## 🎯 Key Integration Points

1. **Authentication** ↔ **All Protected Routes**
2. **Cart Context** ↔ **Product Pages, Cart Page, Checkout**
3. **Products Hook** ↔ **Homepage, Category Pages, Search**
4. **Orders Hook** ↔ **Checkout, Orders Page**
5. **Reviews Hook** ↔ **Product Details Page**

## 📈 Scalability Considerations

```
Current Architecture (Small to Medium Scale)
├── Direct Firestore queries from client
├── Client-side filtering and sorting
├── Real-time updates via Firestore listeners
└── Firebase Authentication for user management

Future Enhancements (Large Scale)
├── Cloud Functions for complex operations
├── Algolia for advanced search
├── Redis for caching
├── CDN for static assets
├── Load balancing
└── Microservices architecture
```

This architecture provides a solid foundation for a production-ready ecommerce platform with room for growth and optimization as your user base expands.
