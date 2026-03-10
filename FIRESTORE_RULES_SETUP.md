# Firestore Security Rules Setup

## 🚨 Fix "Missing or insufficient permissions" Error

This error occurs because Firestore has default security rules that block all access. You need to update the rules in Firebase Console.

## Quick Fix Steps

### Option 1: Apply Production Rules (Recommended)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Select your project: `lipsa-aec23`

2. **Navigate to Firestore Rules**
   - Click on "Firestore Database" in the left sidebar
   - Click on the "Rules" tab at the top

3. **Copy and Paste the Rules**
   - Open the `firestore.rules` file in your project
   - Copy all the content
   - Paste it into the Firebase Console rules editor
   - Click "Publish"

### Option 2: Temporary Development Rules (NOT for Production!)

If you just want to test quickly, use these rules (WARNING: These allow all access):

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

**⚠️ IMPORTANT**: These rules allow anyone to read/write your database. Only use for testing!

## Production Rules Explanation

The `firestore.rules` file in your project contains secure rules:

### Users Collection
- Users can only read/write their own profile
- Prevents users from accessing other users' data

### Products, Categories, Banners
- Anyone can read (for browsing)
- Only authenticated users can create/update/delete

### Carts
- Users can only access their own cart
- Complete privacy for shopping carts

### Orders
- Users can only read their own orders
- Users can only create orders for themselves
- Prevents viewing other customers' orders

### Reviews
- Anyone can read reviews
- Only authenticated users can create reviews
- Users can only edit/delete their own reviews

## Step-by-Step Guide with Screenshots

### 1. Open Firebase Console
![Firebase Console](https://console.firebase.google.com)

### 2. Select Your Project
- Project ID: `lipsa-aec23`
- Project Name: `lipsa`

### 3. Go to Firestore Database
- Left sidebar → "Firestore Database"

### 4. Click Rules Tab
- Top navigation → "Rules"

### 5. Replace Rules
- Delete existing rules
- Paste content from `firestore.rules`
- Click "Publish"

### 6. Wait for Deployment
- Rules take a few seconds to deploy
- You'll see a success message

## Verify Rules Are Working

After applying rules, test:

1. **Without Login** (should work):
   - View products on homepage
   - View categories
   - View banners
   - View product details
   - View reviews

2. **After Login** (should work):
   - Add to cart
   - View cart
   - Place order
   - View orders
   - Submit review

3. **Should NOT work**:
   - Accessing another user's cart
   - Viewing another user's orders
   - Editing another user's reviews

## Common Issues

### Issue: Rules not updating
**Solution**: Wait 30 seconds and refresh your app

### Issue: Still getting permission errors
**Solution**: 
1. Check if you're logged in (for cart/order operations)
2. Verify rules are published in Firebase Console
3. Check browser console for specific error details

### Issue: Can't read products
**Solution**: Make sure you published the rules correctly

## Testing Rules

You can test rules in Firebase Console:

1. Go to Firestore Database → Rules
2. Click "Rules Playground" button
3. Test different scenarios:
   - Authenticated user reading their cart
   - Unauthenticated user reading products
   - User trying to access another user's data

## Development vs Production

### Development (Testing)
```javascript
// Allow all access - ONLY for testing
match /{document=**} {
  allow read, write: if true;
}
```

### Production (Secure)
```javascript
// Use the rules from firestore.rules file
// Proper authentication and authorization checks
```

## Firebase CLI Method (Alternative)

If you prefer using the command line:

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init firestore
```

4. Deploy rules:
```bash
firebase deploy --only firestore:rules
```

## Quick Commands

### Deploy Rules via CLI
```bash
firebase deploy --only firestore:rules
```

### Test Rules Locally
```bash
firebase emulators:start --only firestore
```

## Security Best Practices

1. ✅ Never use `allow read, write: if true` in production
2. ✅ Always validate user authentication
3. ✅ Check resource ownership before allowing access
4. ✅ Use helper functions for common checks
5. ✅ Test rules thoroughly before deploying
6. ✅ Monitor Firestore usage in Firebase Console
7. ✅ Set up billing alerts to prevent unexpected costs

## Next Steps After Applying Rules

1. ✅ Refresh your application
2. ✅ Try registering a new account
3. ✅ Try logging in
4. ✅ Try adding products to cart
5. ✅ Try placing an order
6. ✅ Verify you can't access other users' data

## Need Help?

If you're still having issues:

1. Check Firebase Console → Firestore Database → Usage tab
2. Look for failed requests
3. Check the error details
4. Verify your authentication is working
5. Make sure you're using the correct Firebase project

## Summary

The `firestore.rules` file contains production-ready security rules. Apply them in Firebase Console to fix the permissions error and secure your database.

**Remember**: Always use secure rules in production!
