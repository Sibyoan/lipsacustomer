# Firebase Integration Testing Guide

## Prerequisites

Before testing, ensure you have:
1. Firebase project configured
2. Firestore database created
3. Authentication enabled (Email/Password)
4. Sample data added to Firestore

## Sample Data Structure

### 1. Add Categories

Go to Firebase Console → Firestore → Create collection `categories`

```javascript
// Document 1
{
  name: "Electronics",
  image: "https://example.com/electronics.jpg",
  createdAt: new Date()
}

// Document 2
{
  name: "Home & Kitchen",
  image: "https://example.com/home.jpg",
  createdAt: new Date()
}

// Document 3
{
  name: "Fashion",
  image: "https://example.com/fashion.jpg",
  createdAt: new Date()
}
```

### 2. Add Banners

Collection: `banners`

```javascript
{
  title: "Summer Sale",
  image: "https://example.com/banner.jpg",
  mobileImage: "https://example.com/banner-mobile.jpg", // optional
  link: "/collections/sale",
  createdAt: new Date()
}
```

### 3. Add Products

Collection: `products`

```javascript
{
  name: "Wireless Headphones",
  description: "High-quality wireless headphones with noise cancellation",
  price: 2999,
  discountPrice: 1999,
  category: "Electronics",
  categoryId: "electronics", // Use category document ID
  images: [
    "https://example.com/headphones1.jpg",
    "https://example.com/headphones2.jpg"
  ],
  vendorId: "vendor123",
  vendorName: "Tech Store",
  stock: 50,
  status: "approved", // IMPORTANT: Must be "approved"
  featured: true,
  bestSelling: false,
  newArrival: true,
  createdAt: new Date()
}
```

## Testing Checklist

### ✅ Authentication Tests

#### 1. Register New Customer
- [ ] Go to `/account/register`
- [ ] Fill in name, email, password
- [ ] Click "Register"
- [ ] Should redirect to homepage
- [ ] Check Firestore `users` collection for new document
- [ ] Verify `role: "customer"` is set

#### 2. Login
- [ ] Go to `/account/login`
- [ ] Enter registered email and password
- [ ] Click "Login"
- [ ] Should redirect to homepage
- [ ] User should see their name in header

#### 3. Session Persistence
- [ ] Login to account
- [ ] Refresh the page
- [ ] User should still be logged in
- [ ] Close browser and reopen
- [ ] User should still be logged in

#### 4. Logout
- [ ] Click user dropdown in header
- [ ] Click "Logout"
- [ ] Should be logged out
- [ ] Redirect to homepage

#### 5. Profile Page
- [ ] Login to account
- [ ] Go to `/account/profile`
- [ ] Should see user details (name, email, role, member since)

### ✅ Homepage Tests

#### 1. Banner Slider
- [ ] Homepage loads
- [ ] Banner slider displays banners from Firestore
- [ ] Banners auto-rotate every 4.5 seconds
- [ ] Click left/right arrows to navigate
- [ ] Click dots to jump to specific banner
- [ ] Click banner to navigate to link

#### 2. Categories Display
- [ ] Categories section shows categories from Firestore
- [ ] Each category has image and name
- [ ] Click category to navigate to `/collections/[categoryId]`

#### 3. Products Display
- [ ] Featured products section shows products where `featured: true`
- [ ] Best selling section shows products where `bestSelling: true`
- [ ] New arrivals section shows products where `newArrival: true`
- [ ] Only products with `status: "approved"` are shown

### ✅ Category Page Tests

#### 1. Category Products
- [ ] Go to `/collections/electronics`
- [ ] Should show all products where `categoryId == "electronics"`
- [ ] Only approved products shown
- [ ] Products display correctly with image, name, price

#### 2. Empty Category
- [ ] Go to category with no products
- [ ] Should show "No products found" message

### ✅ Product Details Tests

#### 1. Product Display
- [ ] Click any product
- [ ] Should navigate to `/products/[productId]`
- [ ] Product images display correctly
- [ ] Can click thumbnails to change main image
- [ ] Price displays correctly
- [ ] Discount price shows if available
- [ ] Stock status shows correctly
- [ ] Description displays

#### 2. Add to Cart (Not Logged In)
- [ ] Logout if logged in
- [ ] Go to product page
- [ ] Click "Add to Cart"
- [ ] Should redirect to `/account/login`

#### 3. Add to Cart (Logged In)
- [ ] Login to account
- [ ] Go to product page
- [ ] Select quantity
- [ ] Click "Add to Cart"
- [ ] Should show success message
- [ ] Check Firestore `carts` collection
- [ ] Verify product added to cart document

#### 4. Out of Stock
- [ ] Go to product with `stock: 0`
- [ ] "Add to Cart" button should be disabled
- [ ] Should show "Out of Stock" badge

### ✅ Cart Tests

#### 1. View Cart (Not Logged In)
- [ ] Logout
- [ ] Go to `/cart`
- [ ] Should show "Please login" message

#### 2. View Cart (Logged In)
- [ ] Login
- [ ] Go to `/cart`
- [ ] Should show all cart items
- [ ] Each item shows image, name, price, quantity

#### 3. Update Quantity
- [ ] In cart, click + button
- [ ] Quantity should increase
- [ ] Total price should update
- [ ] Check Firestore - cart document should update

#### 4. Remove Item
- [ ] Click "Remove" on cart item
- [ ] Item should be removed from cart
- [ ] Total price should update
- [ ] Check Firestore - item removed from cart document

#### 5. Empty Cart
- [ ] Remove all items from cart
- [ ] Should show "Your cart is empty" message
- [ ] Should show "Continue Shopping" link

### ✅ Checkout Tests

#### 1. Checkout Access
- [ ] Logout
- [ ] Try to access `/checkout`
- [ ] Should redirect to login

#### 2. Checkout with Empty Cart
- [ ] Login
- [ ] Clear cart
- [ ] Try to access `/checkout`
- [ ] Should redirect to `/cart`

#### 3. Place Order
- [ ] Login
- [ ] Add products to cart
- [ ] Go to `/cart`
- [ ] Click "Proceed to Checkout"
- [ ] Should navigate to `/checkout`
- [ ] Order summary shows all items
- [ ] Select payment method (COD/Online)
- [ ] Click "Place Order"
- [ ] Should create order in Firestore `orders` collection
- [ ] Should clear cart
- [ ] Should redirect to `/orders`

### ✅ Orders Tests

#### 1. View Orders (Not Logged In)
- [ ] Logout
- [ ] Go to `/orders`
- [ ] Should show "Please login" message

#### 2. View Orders (Logged In)
- [ ] Login
- [ ] Go to `/orders`
- [ ] Should show all orders for current user
- [ ] Each order shows:
  - Order ID
  - Order date
  - Status badge
  - Products list
  - Payment method
  - Total amount

#### 3. No Orders
- [ ] Login with new account (no orders)
- [ ] Go to `/orders`
- [ ] Should show "You haven't placed any orders yet"

### ✅ Reviews Tests

#### 1. View Reviews
- [ ] Go to any product page
- [ ] Scroll to reviews section
- [ ] Should show all reviews for that product
- [ ] Each review shows rating, text, customer name, date

#### 2. Write Review (Not Logged In)
- [ ] Logout
- [ ] Go to product page
- [ ] "Write a Review" button should not show OR
- [ ] Click button should redirect to login

#### 3. Write Review (Logged In)
- [ ] Login
- [ ] Go to product page
- [ ] Click "Write a Review"
- [ ] Review form appears
- [ ] Select rating (1-5 stars)
- [ ] Enter review text
- [ ] Click "Submit Review"
- [ ] Review should be added to Firestore `reviews` collection
- [ ] Review should appear on product page

#### 4. No Reviews
- [ ] Go to product with no reviews
- [ ] Should show "No reviews yet. Be the first to review!"

### ✅ Search Tests

#### 1. Search Products
- [ ] Go to `/search?q=laptop`
- [ ] Should show all products matching "laptop"
- [ ] Search in name, description, category
- [ ] Only approved products shown

#### 2. No Results
- [ ] Search for non-existent product
- [ ] Should show "No products found" message

#### 3. Empty Search
- [ ] Go to `/search` without query
- [ ] Should show search form
- [ ] No results displayed

## Common Issues & Solutions

### Issue: Products not showing on homepage
**Solution**: 
- Check product `status` field is "approved"
- Verify product has `images` array with at least one URL
- Check Firestore rules allow read access

### Issue: Can't add to cart
**Solution**:
- Ensure user is logged in
- Check Firestore rules for `carts` collection
- Verify cart document structure matches expected format

### Issue: Orders not creating
**Solution**:
- Check user authentication
- Verify cart has items
- Check Firestore rules for `orders` collection
- Ensure order data structure is correct

### Issue: Reviews not appearing
**Solution**:
- Check `productId` matches actual product ID
- Verify Firestore rules allow read access to reviews
- Ensure review has required fields (rating, review, customerId)

### Issue: Banners not loading
**Solution**:
- Check `banners` collection exists
- Verify banners have required fields (title, image, link, createdAt)
- Check Firestore rules allow read access

## Performance Testing

### Load Time Tests
- [ ] Homepage loads in < 3 seconds
- [ ] Product page loads in < 2 seconds
- [ ] Cart page loads in < 2 seconds
- [ ] Search results load in < 3 seconds

### Concurrent Users
- [ ] Multiple users can browse simultaneously
- [ ] Multiple users can add to cart simultaneously
- [ ] Multiple users can place orders simultaneously

## Security Testing

### Authentication
- [ ] Cannot access cart without login
- [ ] Cannot access orders without login
- [ ] Cannot place order without login
- [ ] Cannot write review without login

### Authorization
- [ ] User can only see their own cart
- [ ] User can only see their own orders
- [ ] User can only edit/delete their own reviews
- [ ] User cannot modify other users' data

### Data Validation
- [ ] Cannot create order with empty cart
- [ ] Cannot add negative quantity to cart
- [ ] Cannot submit review without rating
- [ ] Cannot register with invalid email

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Responsiveness

- [ ] Homepage displays correctly on mobile
- [ ] Product cards stack properly on mobile
- [ ] Cart page is usable on mobile
- [ ] Checkout works on mobile
- [ ] Forms are easy to fill on mobile
- [ ] Banners show mobile images if available

## Firestore Console Verification

After each test, verify in Firebase Console:

1. **Users Collection**
   - New user documents created on registration
   - Correct role assigned

2. **Carts Collection**
   - Cart documents created/updated when adding items
   - Correct structure and data

3. **Orders Collection**
   - Order documents created on checkout
   - Correct status ("pending")
   - All required fields present

4. **Reviews Collection**
   - Review documents created when submitting
   - Correct productId and customerId

## Next Steps After Testing

1. ✅ All tests passing → Deploy to production
2. ❌ Tests failing → Fix issues and retest
3. 📊 Performance issues → Optimize queries and indexes
4. 🔒 Security concerns → Review and update Firestore rules
