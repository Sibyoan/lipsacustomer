# Troubleshooting Guide

## Common Errors and Solutions

### 1. "Missing or insufficient permissions"

**Error Message:**
```
FirebaseError: Missing or insufficient permissions
```

**Cause:** Firestore security rules are blocking access.

**Solution:**
1. Go to Firebase Console → Firestore Database → Rules
2. Apply rules from `firestore.rules` file
3. Click "Publish"
4. Wait 30 seconds and refresh your app

**Quick Fix (Testing Only):**
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

**Detailed Guide:** See `FIX_PERMISSIONS_ERROR.md`

---

### 2. "No products showing on homepage"

**Possible Causes:**
- No products in Firestore
- Products don't have `status: "approved"`
- Firestore rules blocking access

**Solutions:**

**A. Check if products exist:**
1. Go to Firebase Console → Firestore Database
2. Look for `products` collection
3. If empty, add sample products

**B. Check product status:**
```javascript
// Products must have status: "approved"
{
  name: "Product Name",
  status: "approved",  // ← Must be "approved"
  // ... other fields
}
```

**C. Check browser console:**
1. Open browser DevTools (F12)
2. Look for errors in Console tab
3. Check Network tab for failed requests

---

### 3. "Authentication not working"

**Error:** Can't register or login

**Solutions:**

**A. Enable Email/Password Authentication:**
1. Go to Firebase Console → Authentication
2. Click "Sign-in method" tab
3. Enable "Email/Password"
4. Save

**B. Check for errors:**
```javascript
// In browser console
console.log('Auth error:', error.message);
```

**C. Common auth errors:**
- `auth/email-already-in-use` - Email already registered
- `auth/weak-password` - Password too short (min 6 chars)
- `auth/invalid-email` - Invalid email format
- `auth/user-not-found` - User doesn't exist
- `auth/wrong-password` - Incorrect password

---

### 4. "Cart not persisting"

**Problem:** Cart items disappear after refresh

**Solutions:**

**A. Check if user is logged in:**
```typescript
const { user } = useAuth();
console.log('User:', user); // Should not be null
```

**B. Check Firestore rules:**
- Cart operations require authentication
- Rules must allow cart read/write for authenticated users

**C. Check browser console:**
- Look for Firestore errors
- Check if cart document is being created

---

### 5. "Can't place orders"

**Error:** Order creation fails

**Solutions:**

**A. Verify user is authenticated:**
```typescript
if (!user) {
  router.push('/account/login');
  return;
}
```

**B. Check cart has items:**
```typescript
if (cart.length === 0) {
  alert('Cart is empty');
  return;
}
```

**C. Check Firestore rules:**
- Orders collection must allow create for authenticated users

**D. Verify order data structure:**
```javascript
{
  customerId: user.uid,
  products: [...],
  totalPrice: number,
  paymentMethod: "cod" | "online",
  status: "pending",
  createdAt: Date
}
```

---

### 6. "Reviews not showing"

**Problem:** Can't see or submit reviews

**Solutions:**

**A. Check if reviews exist:**
1. Go to Firebase Console → Firestore
2. Check `reviews` collection
3. Filter by `productId`

**B. Check authentication for submission:**
- Must be logged in to submit reviews
- Check `useAuth()` hook

**C. Verify review data:**
```javascript
{
  productId: string,
  customerId: string,
  rating: number (1-5),
  review: string,
  createdAt: Date
}
```

---

### 7. "Build errors"

**Error:** TypeScript or build errors

**Solutions:**

**A. Check for missing dependencies:**
```bash
npm install
```

**B. Clear Next.js cache:**
```bash
rm -rf .next
npm run build
```

**C. Check TypeScript errors:**
```bash
npx tsc --noEmit
```

**D. Common fixes:**
- Restart development server
- Clear browser cache
- Update dependencies

---

### 8. "Firebase initialization error"

**Error:** Firebase app not initialized

**Solutions:**

**A. Check Firebase config:**
```typescript
// src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  // ... all fields must be present
};
```

**B. Verify environment:**
- Config should work in browser
- Check for `typeof window !== 'undefined'` for analytics

**C. Check imports:**
```typescript
import { auth, db, storage } from '@/lib/firebase';
```

---

### 9. "Images not loading"

**Problem:** Product images show broken

**Solutions:**

**A. Check image URLs:**
- Must be valid HTTPS URLs
- Use Firebase Storage or external CDN

**B. Add placeholder:**
```typescript
<img 
  src={product.images[0] || '/placeholder.jpg'} 
  alt={product.name}
/>
```

**C. Upload to Firebase Storage:**
1. Go to Firebase Console → Storage
2. Upload images
3. Get download URL
4. Use in Firestore

---

### 10. "Slow performance"

**Problem:** App is slow or laggy

**Solutions:**

**A. Add Firestore indexes:**
1. Go to Firebase Console → Firestore → Indexes
2. Add composite indexes for complex queries
3. Firebase will suggest indexes in console errors

**B. Optimize queries:**
```typescript
// Use limit
const { products } = useProducts('electronics', 20);

// Use pagination
query(collection, limit(20), startAfter(lastDoc));
```

**C. Cache data:**
```typescript
// Use React state to cache
const [cachedProducts, setCachedProducts] = useState([]);
```

**D. Optimize images:**
- Use compressed images
- Use appropriate image sizes
- Consider lazy loading

---

## Debugging Checklist

### Before Starting:
- [ ] Firebase project is created
- [ ] Firebase config is correct
- [ ] Dependencies are installed
- [ ] Development server is running

### Authentication Issues:
- [ ] Email/Password provider is enabled
- [ ] User is registered
- [ ] Credentials are correct
- [ ] Session persistence is working

### Firestore Issues:
- [ ] Security rules are published
- [ ] Collections exist
- [ ] Documents have correct structure
- [ ] User is authenticated (for protected operations)

### UI Issues:
- [ ] Browser console has no errors
- [ ] Network requests are successful
- [ ] Data is loading correctly
- [ ] Components are rendering

---

## Useful Commands

### Check for errors:
```bash
# Build the app
npm run build

# Run linter
npm run lint

# Check TypeScript
npx tsc --noEmit
```

### Clear cache:
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules
npm install

# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
```

### Firebase CLI:
```bash
# Login
firebase login

# Deploy rules
firebase deploy --only firestore:rules

# View logs
firebase functions:log
```

---

## Browser Console Debugging

### Check authentication:
```javascript
// In browser console
console.log('User:', auth.currentUser);
console.log('User ID:', auth.currentUser?.uid);
```

### Check Firestore:
```javascript
// In browser console
import { collection, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';

const products = await getDocs(collection(db, 'products'));
console.log('Products:', products.docs.map(d => d.data()));
```

### Check cart:
```javascript
// In React component
const { cart } = useCart();
console.log('Cart:', cart);
console.log('Total:', getTotalPrice());
```

---

## Firebase Console Checks

### 1. Authentication
- Go to: Authentication → Users
- Check if users are registered
- Verify email/password provider is enabled

### 2. Firestore
- Go to: Firestore Database → Data
- Check if collections exist
- Verify document structure
- Check document counts

### 3. Rules
- Go to: Firestore Database → Rules
- Verify rules are published
- Check last published date
- Test rules in playground

### 4. Usage
- Go to: Firestore Database → Usage
- Check read/write counts
- Look for errors
- Monitor quota usage

### 5. Storage
- Go to: Storage
- Check if images are uploaded
- Verify storage rules
- Check file permissions

---

## Getting Help

### 1. Check Documentation
- `FIREBASE_INTEGRATION.md` - Technical details
- `SETUP_GUIDE.md` - Setup instructions
- `FIX_PERMISSIONS_ERROR.md` - Permissions fix
- `QUICK_REFERENCE.md` - Quick commands

### 2. Check Browser Console
- Open DevTools (F12)
- Look at Console tab
- Check Network tab
- Review error messages

### 3. Check Firebase Console
- Review Authentication users
- Check Firestore data
- Verify rules are published
- Monitor usage and errors

### 4. Common Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

## Prevention Tips

1. **Always test locally first**
2. **Use proper error handling**
3. **Check authentication before operations**
4. **Validate data before saving**
5. **Monitor Firebase usage**
6. **Keep dependencies updated**
7. **Use TypeScript for type safety**
8. **Test with real data**
9. **Set up proper security rules**
10. **Monitor performance**

---

## Quick Fixes Summary

| Error | Quick Fix |
|-------|-----------|
| Permissions error | Apply Firestore rules |
| No products | Add sample data |
| Auth not working | Enable Email/Password |
| Cart not saving | Check authentication |
| Can't place orders | Verify user is logged in |
| Images broken | Use valid URLs |
| Build errors | Clear cache, reinstall |
| Slow performance | Add indexes, optimize queries |

---

**Remember**: Most issues are related to Firestore security rules or missing authentication. Always check these first!
