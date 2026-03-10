# Quick Start Guide - Firebase Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Add Sample Data (2 minutes)

Go to [Firebase Console](https://console.firebase.google.com) → Your Project → Firestore Database

#### Add a Category
1. Click "Start collection"
2. Collection ID: `categories`
3. Document ID: `electronics`
4. Add fields:
   ```
   name: "Electronics"
   image: "https://images.unsplash.com/photo-1498049794561-7780e7231661"
   createdAt: [Click "timestamp" and use current time]
   ```
5. Click "Save"

#### Add a Product
1. Create collection: `products`
2. Auto-generate document ID
3. Add fields:
   ```
   name: "Wireless Headphones"
   description: "Premium wireless headphones with noise cancellation"
   price: 2999
   discountPrice: 1999
   category: "Electronics"
   categoryId: "electronics"
   images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
   vendorId: "vendor123"
   vendorName: "Tech Store"
   stock: 50
   status: "approved"
   featured: true
   bestSelling: false
   newArrival: true
   createdAt: [Click "timestamp" and use current time]
   ```
4. Click "Save"

#### Add a Banner
1. Create collection: `banners`
2. Auto-generate document ID
3. Add fields:
   ```
   title: "Summer Sale"
   image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
   link: "/collections/electronics"
   createdAt: [Click "timestamp" and use current time]
   ```
4. Click "Save"

### Step 2: Create Firestore Indexes (1 minute)

1. Go to Firestore → Indexes tab
2. Click "Create Index"
3. Create these indexes:

**Index 1**: Products by status
- Collection: `products`
- Fields: `status` (Ascending), `createdAt` (Descending)
- Query scope: Collection

**Index 2**: Products by category
- Collection: `products`
- Fields: `status` (Ascending), `categoryId` (Ascending), `createdAt` (Descending)
- Query scope: Collection

**Index 3**: Orders by customer
- Collection: `orders`
- Fields: `customerId` (Ascending), `createdAt` (Descending)
- Query scope: Collection

**Index 4**: Reviews by product
- Collection: `reviews`
- Fields: `productId` (Ascending), `createdAt` (Descending)
- Query scope: Collection

Wait 2-3 minutes for indexes to build.

### Step 3: Test the Website (2 minutes)

#### Test 1: Homepage
1. Open your website
2. You should see:
   - Banner slider with your banner
   - Categories section with "Electronics"
   - Featured products section with your product

#### Test 2: Register & Login
1. Go to `/account/register`
2. Create account:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Register"
4. Should redirect to homepage
5. Check header - should show "Test User"

#### Test 3: Shopping Flow
1. Click on the product
2. Click "Add to Cart"
3. Go to cart (click cart icon in header)
4. Click "Proceed to Checkout"
5. Select payment method
6. Click "Place Order"
7. Should redirect to orders page
8. See your order listed

#### Test 4: Reviews
1. Go to product page
2. Click "Write a Review"
3. Select rating and write review
4. Click "Submit Review"
5. Review should appear on product page

## ✅ Success Checklist

- [ ] Homepage loads with banner
- [ ] Categories display correctly
- [ ] Products show on homepage
- [ ] Can register new account
- [ ] Can login with account
- [ ] Can view product details
- [ ] Can add product to cart
- [ ] Can view cart
- [ ] Can place order
- [ ] Can view order history
- [ ] Can write review

## 🐛 Troubleshooting

### "Missing or insufficient permissions"
**Solution**: Check `firestore.rules` file is deployed
```bash
firebase deploy --only firestore:rules
```

### "The query requires an index"
**Solution**: Click the link in the error message to create the index automatically

### Products not showing
**Solution**: Ensure product has `status: "approved"` in Firestore

### Can't add to cart
**Solution**: Make sure you're logged in

### Banners not loading
**Solution**: Check `banners` collection exists and has documents

## 📝 Add More Data

### Add More Products
Use this template in Firestore:
```javascript
{
  name: "Product Name",
  description: "Description here",
  price: 999,
  discountPrice: 799, // optional
  category: "Category Name",
  categoryId: "category-id",
  images: ["url1", "url2"],
  vendorId: "vendor123",
  vendorName: "Store Name",
  stock: 50,
  status: "approved", // IMPORTANT!
  featured: false,
  bestSelling: false,
  newArrival: false,
  createdAt: [timestamp]
}
```

### Add More Categories
```javascript
{
  name: "Category Name",
  image: "image-url",
  createdAt: [timestamp]
}
```

### Add More Banners
```javascript
{
  title: "Banner Title",
  image: "desktop-image-url",
  mobileImage: "mobile-image-url", // optional
  link: "/collections/category",
  createdAt: [timestamp]
}
```

## 🎯 Next Actions

1. ✅ Add 10-20 products for testing
2. ✅ Add 3-5 categories
3. ✅ Add 2-3 banners
4. ✅ Test complete shopping flow
5. ✅ Test on mobile devices
6. ✅ Review Firestore security rules
7. ✅ Set up Firebase hosting (optional)
8. ✅ Configure custom domain (optional)

## 📚 Full Documentation

For detailed information, see:
- `FIREBASE_INTEGRATION_COMPLETE.md` - Complete integration guide
- `TESTING_GUIDE.md` - Comprehensive testing checklist
- `FIRESTORE_DATA_STRUCTURE.md` - Data structure reference
- `INTEGRATION_SUMMARY.md` - Feature summary

## 🎉 You're Ready!

Your Firebase integration is complete and working. Start adding your products and go live!

Need help? Check the documentation files or Firebase Console for error logs.
