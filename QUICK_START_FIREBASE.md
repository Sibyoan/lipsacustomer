# Quick Start Guide - Firebase Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Add Sample Data to Firestore

You have two options:

#### Option A: Use the Seed Script (Recommended)
```bash
# Install dependencies if not already installed
npm install

# Copy and run the seed script
cp scripts/seed-complete-data.example.js scripts/seed-complete-data.js
node scripts/seed-complete-data.js
```

This will add:
- 5 categories (Electronics, Fashion, Home & Kitchen, Beauty, Sports)
- 10+ sample products
- 3 banner slides

#### Option B: Manual Entry via Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `lipsa-aec23`
3. Navigate to Firestore Database
4. Add documents manually following the structure in `FIREBASE_INTEGRATION_COMPLETE.md`

### Step 2: Test Customer Registration

1. Start your development server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/account/register`

3. Register a new customer:
   - Name: Test Customer
   - Email: customer@test.com
   - Password: Test123!

4. You should be automatically logged in and redirected

### Step 3: Browse Products

1. Go to homepage: `http://localhost:3000`
2. You should see:
   - Banner slider (if you added banners)
   - Categories
   - Products grid

3. Click on a category to view category-specific products

### Step 4: Add to Cart

1. Click on any product to view details
2. Select quantity
3. Click "Add to Cart"
4. View cart at: `http://localhost:3000/cart`

### Step 5: Place an Order

1. From cart page, click "Proceed to Checkout"
2. Fill in shipping address:
   - Street: 123 Main Street
   - City: Mumbai
   - State: Maharashtra
   - ZIP: 400001
   - Country: India

3. Select payment method (COD or Online)
4. Click "Place Order"
5. View your order at: `http://localhost:3000/orders`

### Step 6: Leave a Review

1. Go to any product details page
2. Click "Write a Review"
3. Select rating (1-5 stars)
4. Write your review
5. Submit

## 🔍 Verify Everything Works

### Check Firestore Console

1. Go to Firebase Console → Firestore Database
2. Verify these collections exist:
   - ✅ `users` - Should have your test customer
   - ✅ `products` - Should have sample products
   - ✅ `categories` - Should have categories
   - ✅ `banners` - Should have banner slides
   - ✅ `carts` - Should have your cart (after adding items)
   - ✅ `orders` - Should have your order (after checkout)
   - ✅ `reviews` - Should have your review (after submitting)

### Test User Flow

- [x] Register new customer
- [x] Login with existing customer
- [x] Browse homepage
- [x] View category page
- [x] View product details
- [x] Add product to cart
- [x] Update cart quantity
- [x] Remove from cart
- [x] Checkout with shipping address
- [x] View order history
- [x] Leave product review
- [x] Logout

## 🎯 Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with banners and products |
| `/account/register` | Customer registration |
| `/account/login` | Customer login |
| `/account/profile` | Customer profile |
| `/collections/[slug]` | Category products page |
| `/products/[id]` | Product details page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout page |
| `/orders` | Order history |

## 🔐 Test Accounts

After registration, you can create multiple test accounts:

**Customer 1:**
- Email: customer1@test.com
- Password: Test123!

**Customer 2:**
- Email: customer2@test.com
- Password: Test123!

## 📊 Sample Data Structure

### Add a Product Manually

If you want to add products manually via Firebase Console:

```javascript
{
  name: "Product Name",
  description: "Product description",
  price: 999,
  discountPrice: 799,
  category: "Electronics",
  categoryId: "electronics",
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  vendorId: "vendor1",
  vendorName: "Vendor Name",
  stock: 50,
  status: "approved",
  featured: true,
  bestSelling: false,
  newArrival: true,
  createdAt: [Firebase Timestamp]
}
```

### Add a Category Manually

```javascript
{
  name: "Electronics",
  slug: "electronics",
  description: "Electronic gadgets and devices",
  image: "https://example.com/category.jpg",
  icon: "📱",
  createdAt: [Firebase Timestamp]
}
```

### Add a Banner Manually

```javascript
{
  title: "Sale Banner",
  image: "https://example.com/banner.jpg",
  mobileImage: "https://example.com/banner-mobile.jpg",
  link: "/collections/electronics",
  createdAt: [Firebase Timestamp]
}
```

## 🐛 Troubleshooting

### Products Not Showing
- Check if products have `status: "approved"`
- Verify `categoryId` matches the category document ID
- Check browser console for errors

### Cart Not Working
- Ensure user is logged in
- Check Firestore rules allow cart access
- Verify cart collection exists

### Orders Not Creating
- Check if user is authenticated
- Verify order data structure
- Check Firestore rules for orders collection

### Reviews Not Showing
- Ensure `productId` matches the product document ID
- Check if user is logged in when submitting
- Verify reviews collection exists

## 📚 Next Steps

1. **Customize Design**: Update colors, fonts, and layouts
2. **Add More Products**: Use seed script or Firebase Console
3. **Configure Payment**: Integrate payment gateway
4. **Email Notifications**: Set up order confirmation emails
5. **Admin Panel**: Build admin dashboard for managing products
6. **Vendor Portal**: Create vendor dashboard for product management

## 🎉 You're All Set!

Your ecommerce marketplace is now fully functional with:
- ✅ Customer authentication
- ✅ Product browsing
- ✅ Shopping cart
- ✅ Order management
- ✅ Product reviews
- ✅ Category navigation
- ✅ Search functionality

Happy coding! 🚀
