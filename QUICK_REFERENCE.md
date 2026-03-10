# Quick Reference Guide

## 🔥 Firebase Integration - Quick Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📍 Important Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/account/login` | Login page |
| `/account/register` | Registration page |
| `/products/[id]` | Product details |
| `/collections/[slug]` | Category page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/orders` | Order history |

## 🎣 Custom Hooks

### useAuth()
```typescript
const { user, userData, loading, register, login, logout } = useAuth();
```

### useCart()
```typescript
const { cart, loading, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
```

### useProducts(category?, limit?)
```typescript
const { products, loading, error, refetch } = useProducts('electronics', 20);
```

### useCategories()
```typescript
const { categories, loading, error, refetch } = useCategories();
```

### useBanners()
```typescript
const { banners, loading, error, refetch } = useBanners();
```

### useOrders()
```typescript
const { orders, loading, error, createOrder, refetch } = useOrders();
```

### useReviews(productId)
```typescript
const { reviews, loading, error, addReview, refetch } = useReviews('product123');
```

## 🔐 Authentication Examples

### Register
```typescript
await register('user@example.com', 'password123', 'John Doe');
```

### Login
```typescript
await login('user@example.com', 'password123');
```

### Logout
```typescript
await logout();
```

### Check Auth Status
```typescript
if (user) {
  console.log('Logged in as:', userData?.name);
}
```

## 🛒 Cart Operations

### Add to Cart
```typescript
await addToCart({
  productId: 'prod123',
  name: 'Product Name',
  price: 299,
  quantity: 1,
  image: 'https://...'
});
```

### Update Quantity
```typescript
await updateQuantity('prod123', 3);
```

### Remove from Cart
```typescript
await removeFromCart('prod123');
```

### Get Total
```typescript
const total = getTotalPrice();
```

## 📦 Order Operations

### Create Order
```typescript
const orderId = await createOrder(
  cart,           // cart items
  getTotalPrice(), // total price
  'cod'           // payment method
);
```

### Get Order History
```typescript
const { orders } = useOrders();
```

## ⭐ Review Operations

### Add Review
```typescript
await addReview(
  'product123',           // product ID
  5,                      // rating (1-5)
  'Great product!'        // review text
);
```

### Get Reviews
```typescript
const { reviews } = useReviews('product123');
```

## 🗄️ Firestore Collections

### Users
```javascript
{
  id: string,
  name: string,
  email: string,
  role: "customer",
  createdAt: Date
}
```

### Products
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  discountPrice: number,
  category: string,
  images: string[],
  vendorId: string,
  stock: number,
  status: "approved",
  createdAt: Date
}
```

### Categories
```javascript
{
  id: string,
  name: string,
  image: string,
  createdAt: Date
}
```

### Carts
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

### Orders
```javascript
{
  id: string,
  customerId: string,
  products: [...],
  totalPrice: number,
  paymentMethod: "cod" | "online",
  status: "pending",
  createdAt: Date
}
```

### Reviews
```javascript
{
  id: string,
  productId: string,
  customerId: string,
  rating: number,
  review: string,
  createdAt: Date
}
```

## 🔧 Common Tasks

### Add a New Product (Firestore Console)
1. Go to Firestore Database
2. Select `products` collection
3. Click "Add document"
4. Fill in the fields
5. Set `status: "approved"`

### Add a Category
1. Go to Firestore Database
2. Select `categories` collection
3. Click "Add document"
4. Add name and image URL

### View User Orders
1. Go to Firestore Database
2. Select `orders` collection
3. Filter by `customerId`

## 🐛 Debugging

### Check Authentication
```typescript
console.log('User:', user);
console.log('User Data:', userData);
```

### Check Cart
```typescript
console.log('Cart:', cart);
console.log('Total:', getTotalPrice());
```

### Check Products
```typescript
console.log('Products:', products);
console.log('Loading:', loading);
console.log('Error:', error);
```

## 📱 Component Usage

### ProductCard
```typescript
<ProductCard product={product} />
```

### ProductsGrid
```typescript
<ProductsGrid 
  category="electronics" 
  title="Electronics" 
  limit={12} 
/>
```

## 🔒 Protected Routes

To protect a route, check authentication:
```typescript
if (!user) {
  router.push('/account/login');
  return null;
}
```

## 📊 Firebase Console Links

- **Authentication**: Firebase Console → Authentication
- **Firestore**: Firebase Console → Firestore Database
- **Storage**: Firebase Console → Storage
- **Rules**: Firebase Console → Firestore Database → Rules

## 🎯 Testing Checklist

- [ ] Register new account
- [ ] Login with credentials
- [ ] Browse products
- [ ] View product details
- [ ] Add to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] Checkout
- [ ] View orders
- [ ] Submit review
- [ ] Logout

## 📚 Documentation Files

- `FIREBASE_INTEGRATION.md` - Technical documentation
- `SETUP_GUIDE.md` - Setup instructions
- `IMPLEMENTATION_SUMMARY.md` - Implementation overview
- `QUICK_REFERENCE.md` - This file

## 💡 Tips

1. Always check if user is authenticated before cart/order operations
2. Use loading states to show feedback to users
3. Handle errors gracefully with try-catch
4. Test with real Firebase data
5. Set up Firestore security rules before production
6. Use environment variables for sensitive config
7. Optimize images for better performance
8. Add indexes for complex Firestore queries

## 🚀 Next Steps

1. Add sample data to Firestore
2. Test all features
3. Set up security rules
4. Deploy to production
5. Monitor Firebase usage
6. Optimize performance
7. Add more features

## 📞 Need Help?

- Check browser console for errors
- Review Firebase Console for backend issues
- Check Firestore rules if operations fail
- Verify authentication status
- Review documentation files
