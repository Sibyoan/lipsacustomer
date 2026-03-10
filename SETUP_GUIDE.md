# Firebase Integration Setup Guide

## Quick Start

Your Next.js customer website is now fully integrated with Firebase! Here's what has been implemented:

## ✅ Completed Features

### 1. Authentication System
- ✅ Customer registration (`/account/register`)
- ✅ Customer login (`/account/login`)
- ✅ Session persistence
- ✅ User profile management
- ✅ Logout functionality

### 2. Product Browsing
- ✅ Homepage product display
- ✅ Product details page (`/products/[id]`)
- ✅ Category-based filtering (`/collections/[slug]`)
- ✅ Product search capability
- ✅ Only approved products shown

### 3. Shopping Cart
- ✅ Add to cart functionality
- ✅ Remove from cart
- ✅ Update quantities
- ✅ Cart persistence in Firestore
- ✅ Cart count in header

### 4. Checkout & Orders
- ✅ Checkout page (`/checkout`)
- ✅ Order placement
- ✅ Order history (`/orders`)
- ✅ Payment method selection (COD/Online)

### 5. Reviews System
- ✅ View product reviews
- ✅ Submit reviews (authenticated users)
- ✅ Rating system (1-5 stars)

### 6. UI Components
- ✅ Updated header with auth status
- ✅ Product cards
- ✅ Products grid
- ✅ User menu with logout

## 📁 New Files Created

### Contexts
- `src/contexts/AuthContext.tsx` - Authentication management
- `src/contexts/CartContext.tsx` - Shopping cart management

### Hooks
- `src/hooks/useProducts.ts` - Fetch products from Firestore
- `src/hooks/useCategories.ts` - Fetch categories
- `src/hooks/useBanners.ts` - Fetch homepage banners
- `src/hooks/useOrders.ts` - Order management
- `src/hooks/useReviews.ts` - Review management

### Pages
- `src/app/cart/page.tsx` - Shopping cart page
- `src/app/checkout/page.tsx` - Checkout page
- `src/app/orders/page.tsx` - Order history page
- `src/app/products/[id]/page.tsx` - Product details page

### Components
- `src/components/ProductCard.tsx` - Product card component
- `src/components/sections/products-grid.tsx` - Products grid layout

### Documentation
- `FIREBASE_INTEGRATION.md` - Detailed integration documentation
- `SETUP_GUIDE.md` - This file

## 🔧 Modified Files

- `src/app/layout.tsx` - Added AuthProvider and CartProvider
- `src/app/account/login/page.tsx` - Integrated Firebase authentication
- `src/app/account/register/page.tsx` - Integrated Firebase authentication
- `src/app/collections/[slug]/page.tsx` - Integrated Firestore products
- `src/components/sections/header.tsx` - Added cart count and user menu

## 🚀 Next Steps

### 1. Set Up Firestore Collections

You need to create the following collections in your Firebase Console:

#### Products Collection
```javascript
// Example product document
{
  name: "Sample Product",
  description: "Product description here",
  price: 299,
  discountPrice: 199,
  category: "electronics",
  images: ["https://example.com/image1.jpg"],
  vendorId: "vendor123",
  stock: 50,
  status: "approved",
  createdAt: new Date()
}
```

#### Categories Collection
```javascript
// Example category document
{
  name: "Electronics",
  image: "https://example.com/category.jpg",
  createdAt: new Date()
}
```

#### Banners Collection
```javascript
// Example banner document
{
  title: "Summer Sale",
  image: "https://example.com/banner.jpg",
  link: "/collections/summer-sale",
  createdAt: new Date()
}
```

### 2. Configure Firestore Security Rules (CRITICAL!)

**This step is required to fix the "Missing or insufficient permissions" error.**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `lipsa-aec23`
3. Click "Firestore Database" in the left sidebar
4. Click the "Rules" tab at the top
5. Copy the content from `firestore.rules` file in your project
6. Paste it into the rules editor
7. Click "Publish"

**Quick Test Rules (Development Only)**:
If you want to test quickly, use these temporary rules (NOT for production):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING**: The test rules above allow anyone to access your database. Only use for testing!

For detailed instructions, see `FIRESTORE_RULES_SETUP.md`.

### 3. Test the Application

```bash
npm run dev
```

Then test:
1. Register a new account at `/account/register`
2. Login at `/account/login`
3. Browse products on homepage
4. Click on a product to view details
5. Add products to cart
6. View cart at `/cart`
7. Proceed to checkout at `/checkout`
8. Place an order
9. View orders at `/orders`
10. Submit a product review

### 4. Add Sample Data

You can use the Firebase Console to manually add sample data, or create a script to seed your database.

Example seed script location: `scripts/seed-firestore.js`

### 5. Configure Image Storage with Cloudinary

This project uses Cloudinary for image storage instead of Firebase Storage.

**To set up Cloudinary:**

1. Create a free account at [Cloudinary](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret
3. When uploading images (products, banners, categories):
   - Upload to Cloudinary
   - Use the Cloudinary URL in Firestore documents
   - Example: `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/products/product1.jpg`

**Image URLs in Firestore:**
```javascript
// Product document
{
  name: "Product Name",
  images: [
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1/products/img1.jpg",
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1/products/img2.jpg"
  ],
  // ... other fields
}

// Category document
{
  name: "Electronics",
  image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/categories/electronics.jpg",
  // ... other fields
}

// Banner document
{
  title: "Summer Sale",
  image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/banners/summer-sale.jpg",
  // ... other fields
}
```

**Note:** You don't need to configure Firebase Storage rules since images are hosted on Cloudinary.

## 🔐 Security Considerations

1. **Firestore Rules**: Apply the security rules from `FIREBASE_INTEGRATION.md`
2. **Environment Variables**: Consider moving Firebase config to environment variables
3. **API Keys**: The Firebase API key in the config is safe for client-side use
4. **Authentication**: All sensitive operations require authentication

## 📱 Features Overview

### For Customers
- Browse products by category
- Search products
- View product details with images
- Add products to cart
- Update cart quantities
- Place orders with COD or online payment
- View order history
- Submit product reviews
- Rate products (1-5 stars)

### For Admins (Future Enhancement)
- Approve/reject products
- Manage categories
- Manage banners
- View all orders
- Manage users

## 🐛 Troubleshooting

### Products not showing?
- Check if products exist in Firestore
- Verify products have `status: "approved"`
- Check browser console for errors

### Authentication not working?
- Verify Firebase Authentication is enabled in Firebase Console
- Check if Email/Password provider is enabled
- Look for errors in browser console

### "Missing or insufficient permissions" error?
- **This is the most common error!**
- You need to set up Firestore security rules
- See `FIRESTORE_RULES_SETUP.md` for detailed instructions
- Quick fix: Apply the rules from `firestore.rules` file in Firebase Console
- Go to: Firebase Console → Firestore Database → Rules → Publish

### Cart not persisting?
- Ensure user is logged in
- Check Firestore rules allow cart writes
- Verify cart collection exists

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)

## 🎉 You're All Set!

Your customer website is now fully integrated with Firebase. Start by adding some products and categories to Firestore, then test the complete shopping flow!
