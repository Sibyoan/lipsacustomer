# Firestore Data Structure Reference

## Quick Reference for All Collections

### 1. users
**Purpose**: Store customer account information

```javascript
{
  id: "auto-generated-uid",
  name: "John Doe",
  email: "john@example.com",
  role: "customer",
  createdAt: Timestamp
}
```

**Indexes**: None required
**Rules**: Read (authenticated), Write (own document only)

---

### 2. products
**Purpose**: Store product catalog

```javascript
{
  id: "auto-generated",
  name: "Product Name",
  description: "Product description text",
  price: 999,
  discountPrice: 799, // optional
  category: "Electronics",
  categoryId: "electronics", // for filtering
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  vendorId: "vendor-user-id",
  vendorName: "Vendor Store Name", // optional
  stock: 50,
  status: "approved", // REQUIRED: "approved", "pending", "rejected"
  featured: false, // optional
  bestSelling: false, // optional
  newArrival: true, // optional
  createdAt: Timestamp
}
```

**Required Indexes**:
- `status` (Ascending) + `createdAt` (Descending)
- `status` (Ascending) + `categoryId` (Ascending) + `createdAt` (Descending)
- `status` (Ascending) + `featured` (Ascending) + `createdAt` (Descending)
- `status` (Ascending) + `bestSelling` (Ascending) + `createdAt` (Descending)
- `status` (Ascending) + `newArrival` (Ascending) + `createdAt` (Descending)

**Rules**: Read (public), Write (vendors/admins only)

---

### 3. categories
**Purpose**: Store product categories

```javascript
{
  id: "electronics", // use lowercase, hyphenated
  name: "Electronics",
  image: "https://example.com/category.jpg",
  createdAt: Timestamp
}
```

**Indexes**: None required
**Rules**: Read (public), Write (admins only)

---

### 4. banners
**Purpose**: Store homepage banner slides

```javascript
{
  id: "auto-generated",
  title: "Summer Sale - Up to 70% Off",
  image: "https://example.com/banner-desktop.jpg",
  mobileImage: "https://example.com/banner-mobile.jpg", // optional
  link: "/collections/sale",
  createdAt: Timestamp
}
```

**Indexes**: None required
**Rules**: Read (public), Write (admins only)

---

### 5. carts
**Purpose**: Store user shopping carts
**Document ID**: Use userId as document ID

```javascript
{
  userId: "user-id",
  products: [
    {
      productId: "product-id",
      name: "Product Name",
      price: 999,
      quantity: 2,
      image: "https://example.com/image.jpg"
    }
  ],
  totalPrice: 1998,
  updatedAt: Timestamp
}
```

**Indexes**: None required
**Rules**: Read/Write (own cart only)

---

### 6. orders
**Purpose**: Store customer orders

```javascript
{
  id: "auto-generated",
  customerId: "user-id",
  customerName: "John Doe", // optional
  products: [
    {
      productId: "product-id",
      name: "Product Name",
      price: 999,
      quantity: 2,
      image: "https://example.com/image.jpg",
      vendorId: "vendor-id" // optional
    }
  ],
  vendors: ["vendor-id-1", "vendor-id-2"], // optional
  totalAmount: 1998,
  totalPrice: 1998, // alias for totalAmount
  paymentMethod: "cod", // "cod" or "online"
  paymentStatus: "pending", // "pending", "paid", "failed"
  orderStatus: "pending", // "pending", "processing", "shipped", "delivered", "cancelled"
  status: "pending", // main status field
  createdAt: Timestamp
}
```

**Required Indexes**:
- `customerId` (Ascending) + `createdAt` (Descending)

**Rules**: Read (own orders), Create (authenticated), Update (admins only)

---

### 7. reviews
**Purpose**: Store product reviews

```javascript
{
  id: "auto-generated",
  productId: "product-id",
  customerId: "user-id",
  customerName: "John Doe", // optional
  rating: 5, // 1-5
  review: "Great product! Highly recommended.",
  createdAt: Timestamp
}
```

**Required Indexes**:
- `productId` (Ascending) + `createdAt` (Descending)

**Rules**: Read (public), Create (authenticated), Update/Delete (own reviews)

---

## Firestore Indexes Setup

Go to Firebase Console → Firestore → Indexes → Create Index

### Required Composite Indexes

1. **Products - Basic Filter**
   - Collection: `products`
   - Fields: `status` (Ascending), `createdAt` (Descending)

2. **Products - Category Filter**
   - Collection: `products`
   - Fields: `status` (Ascending), `categoryId` (Ascending), `createdAt` (Descending)

3. **Products - Featured**
   - Collection: `products`
   - Fields: `status` (Ascending), `featured` (Ascending), `createdAt` (Descending)

4. **Products - Best Selling**
   - Collection: `products`
   - Fields: `status` (Ascending), `bestSelling` (Ascending), `createdAt` (Descending)

5. **Products - New Arrivals**
   - Collection: `products`
   - Fields: `status` (Ascending), `newArrival` (Ascending), `createdAt` (Descending)

6. **Orders - Customer Orders**
   - Collection: `orders`
   - Fields: `customerId` (Ascending), `createdAt` (Descending)

7. **Reviews - Product Reviews**
   - Collection: `reviews`
   - Fields: `productId` (Ascending), `createdAt` (Descending)

---

## Sample Data for Testing

### Add Sample Category
```javascript
// Firestore Console → categories → Add Document
{
  name: "Electronics",
  image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  createdAt: firebase.firestore.Timestamp.now()
}
```

### Add Sample Product
```javascript
// Firestore Console → products → Add Document
{
  name: "Wireless Bluetooth Headphones",
  description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.",
  price: 2999,
  discountPrice: 1999,
  category: "Electronics",
  categoryId: "electronics",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944"
  ],
  vendorId: "vendor123",
  vendorName: "Tech Store",
  stock: 50,
  status: "approved",
  featured: true,
  bestSelling: false,
  newArrival: true,
  createdAt: firebase.firestore.Timestamp.now()
}
```

### Add Sample Banner
```javascript
// Firestore Console → banners → Add Document
{
  title: "Summer Sale - Get Up to 70% Off",
  image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
  link: "/collections/sale",
  createdAt: firebase.firestore.Timestamp.now()
}
```

---

## Data Validation Rules

### Products
- ✅ `status` must be "approved" to show on website
- ✅ `images` array must have at least 1 URL
- ✅ `price` must be positive number
- ✅ `stock` must be non-negative number
- ✅ `categoryId` should match a category document ID

### Orders
- ✅ `status` starts as "pending"
- ✅ `products` array cannot be empty
- ✅ `totalPrice` must match sum of product prices
- ✅ `customerId` must match authenticated user

### Reviews
- ✅ `rating` must be 1-5
- ✅ `review` text is required
- ✅ `productId` must exist
- ✅ `customerId` must match authenticated user

### Carts
- ✅ Document ID must match userId
- ✅ `quantity` must be positive
- ✅ `totalPrice` should match sum of items

---

## Common Queries

### Get Approved Products
```javascript
const q = query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  orderBy('createdAt', 'desc'),
  limit(20)
);
```

### Get Products by Category
```javascript
const q = query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  where('categoryId', '==', 'electronics'),
  orderBy('createdAt', 'desc')
);
```

### Get Featured Products
```javascript
const q = query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  where('featured', '==', true),
  orderBy('createdAt', 'desc'),
  limit(10)
);
```

### Get User Orders
```javascript
const q = query(
  collection(db, 'orders'),
  where('customerId', '==', userId),
  orderBy('createdAt', 'desc')
);
```

### Get Product Reviews
```javascript
const q = query(
  collection(db, 'reviews'),
  where('productId', '==', productId),
  orderBy('createdAt', 'desc')
);
```

---

## Migration Checklist

If migrating from existing data:

- [ ] Ensure all products have `status` field
- [ ] Add `categoryId` to products (lowercase, hyphenated)
- [ ] Verify all product images are valid URLs
- [ ] Set `role: "customer"` for all users
- [ ] Add `createdAt` timestamps to all documents
- [ ] Create required Firestore indexes
- [ ] Test queries in Firestore console
- [ ] Deploy updated security rules

---

## Backup & Export

### Export Collections
```bash
# Using Firebase CLI
firebase firestore:export gs://your-bucket/backups/$(date +%Y%m%d)
```

### Import Collections
```bash
firebase firestore:import gs://your-bucket/backups/20240307
```

---

## Monitoring

### Key Metrics to Track
- Total products (by status)
- Total orders (by status)
- Total users (by role)
- Average order value
- Products with low stock
- Most reviewed products
- Most ordered products

### Firestore Usage
- Document reads per day
- Document writes per day
- Storage size
- Index size

---

## Troubleshooting

### "Missing or insufficient permissions"
- Check Firestore rules
- Verify user is authenticated
- Ensure user has correct role

### "The query requires an index"
- Go to Firebase Console → Firestore → Indexes
- Click the link in the error message to create index
- Wait for index to build (can take a few minutes)

### Products not showing
- Verify `status == "approved"`
- Check product has images array
- Ensure categoryId matches category document

### Cart not saving
- Check user is authenticated
- Verify cart document ID matches userId
- Check Firestore rules allow write access
