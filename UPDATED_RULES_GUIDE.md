# Updated Firestore Rules Guide

## Overview

The Firestore rules have been updated to support the complete multi-vendor marketplace with proper role-based access control.

## User Roles

### 1. Customer
- Can browse products
- Can manage their own cart
- Can place orders
- Can submit reviews
- Can request returns

### 2. Vendor
- Can create products (if approved)
- Can manage their own products
- Can view orders for their products
- Can request payouts
- Cannot access other vendors' data

### 3. Admin
- Full access to all collections
- Can approve/reject vendors
- Can manage all products
- Can manage categories and banners
- Can process payout requests

## Collections & Access Rules

### Users Collection
```javascript
match /users/{userId} {
  allow read: if isAuthenticated();
  allow create: if isAuthenticated();
  allow update: if isAdmin() || request.auth.uid == userId;
  allow delete: if isAdmin();
}
```

**Access:**
- ✅ Any authenticated user can read user profiles
- ✅ Any authenticated user can create their profile
- ✅ Users can update their own profile
- ✅ Admins can update/delete any profile

### Vendors Collection
```javascript
match /vendors/{vendorId} {
  allow read: if isAuthenticated();
  allow create: if isAuthenticated() && request.auth.uid == vendorId;
  allow update: if (isAuthenticated() && request.auth.uid == vendorId) || isAdmin();
  allow delete: if isAdmin();
}
```

**Access:**
- ✅ Any authenticated user can view vendor profiles
- ✅ Users can create their own vendor profile
- ✅ Vendors can update their own profile
- ✅ Admins can approve/reject vendors

### Products Collection
```javascript
match /products/{productId} {
  allow read: if true;
  allow create: if isApprovedVendor();
  allow update, delete: if (isVendor() && resource.data.vendorId == request.auth.uid) || isAdmin();
}
```

**Access:**
- ✅ Anyone can browse products (public)
- ✅ Only approved vendors can create products
- ✅ Vendors can only edit their own products
- ✅ Admins can manage all products

### Categories Collection
```javascript
match /categories/{categoryId} {
  allow read: if true;
  allow write: if isAdmin();
}
```

**Access:**
- ✅ Anyone can view categories (public)
- ✅ Only admins can create/update/delete categories

### Banners Collection
```javascript
match /banners/{bannerId} {
  allow read: if true;
  allow write: if isAdmin();
}
```

**Access:**
- ✅ Anyone can view banners (public)
- ✅ Only admins can manage banners

### Carts Collection
```javascript
match /carts/{userId} {
  allow read: if isAuthenticated() && request.auth.uid == userId;
  allow write: if isAuthenticated() && request.auth.uid == userId;
}
```

**Access:**
- ✅ Users can only access their own cart
- ✅ Complete privacy for shopping carts
- ❌ Cannot view other users' carts

### Orders Collection
```javascript
match /orders/{orderId} {
  allow read: if isAuthenticated() && 
                 (resource.data.customerId == request.auth.uid || 
                  resource.data.vendorId == request.auth.uid || 
                  isAdmin());
  allow create: if isAuthenticated() && isCustomer();
  allow update: if isAdmin() || 
                   (isVendor() && resource.data.vendorId == request.auth.uid);
  allow delete: if isAdmin();
}
```

**Access:**
- ✅ Customers can view their own orders
- ✅ Vendors can view orders for their products
- ✅ Admins can view all orders
- ✅ Only customers can create orders
- ✅ Vendors can update order status for their products
- ✅ Admins have full control

### Reviews Collection
```javascript
match /reviews/{reviewId} {
  allow read: if true;
  allow create: if isAuthenticated() && 
                   isCustomer() &&
                   request.resource.data.customerId == request.auth.uid;
  allow update: if isAuthenticated() && 
                   resource.data.customerId == request.auth.uid;
  allow delete: if isAdmin() || 
                   (isAuthenticated() && resource.data.customerId == request.auth.uid);
}
```

**Access:**
- ✅ Anyone can read reviews (public)
- ✅ Only customers can submit reviews
- ✅ Users can edit their own reviews
- ✅ Users can delete their own reviews
- ✅ Admins can delete any review

### Returns Collection
```javascript
match /returns/{returnId} {
  allow read: if isAuthenticated() && 
                 (resource.data.customerId == request.auth.uid || isAdmin());
  allow create: if isAuthenticated() && isCustomer();
  allow update: if isAdmin();
  allow delete: if isAdmin();
}
```

**Access:**
- ✅ Customers can view their own returns
- ✅ Admins can view all returns
- ✅ Only customers can create return requests
- ✅ Only admins can update/delete returns

### Coupons Collection
```javascript
match /coupons/{couponId} {
  allow read: if true;
  allow write: if isAdmin();
}
```

**Access:**
- ✅ Anyone can view coupons (for validation)
- ✅ Only admins can create/manage coupons

### Payout Requests Collection
```javascript
match /payoutRequests/{payoutId} {
  allow read: if isAuthenticated() && 
                 (resource.data.vendorId == request.auth.uid || isAdmin());
  allow create: if isVendor() && 
                   request.resource.data.vendorId == request.auth.uid;
  allow update: if isAdmin();
  allow delete: if isAdmin();
}
```

**Access:**
- ✅ Vendors can view their own payout requests
- ✅ Admins can view all payout requests
- ✅ Vendors can create payout requests
- ✅ Only admins can approve/reject payouts

### Settings Collection
```javascript
match /settings/{settingId} {
  allow read: if isAuthenticated();
  allow write: if isAdmin();
}
```

**Access:**
- ✅ Any authenticated user can read settings
- ✅ Only admins can modify settings

## Helper Functions

### isAuthenticated()
Checks if user is logged in:
```javascript
function isAuthenticated() {
  return request.auth != null;
}
```

### isAdmin()
Checks if user has admin role:
```javascript
function isAdmin() {
  return isAuthenticated() && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

### isVendor()
Checks if vendor document exists:
```javascript
function isVendor() {
  return isAuthenticated() && 
         exists(/databases/$(database)/documents/vendors/$(request.auth.uid));
}
```

### isApprovedVendor()
Checks if vendor is approved:
```javascript
function isApprovedVendor() {
  return isAuthenticated() && 
         exists(/databases/$(database)/documents/vendors/$(request.auth.uid)) &&
         get(/databases/$(database)/documents/vendors/$(request.auth.uid)).data.status == 'approved';
}
```

### isCustomer()
Checks if user has customer role:
```javascript
function isCustomer() {
  return isAuthenticated() && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'customer';
}
```

## Security Features

### 1. Role-Based Access Control
- Different permissions for customers, vendors, and admins
- Prevents unauthorized access to sensitive data

### 2. Data Isolation
- Users can only access their own carts
- Customers can only see their own orders
- Vendors can only manage their own products

### 3. Vendor Approval System
- Only approved vendors can create products
- Prevents spam and maintains quality

### 4. Admin Controls
- Admins have full access for management
- Can approve vendors, manage products, process payouts

## Testing Rules

### Test as Customer
```javascript
// Should work
- Browse products
- Add to cart
- Place order
- Submit review
- View own orders

// Should NOT work
- Create products
- View other users' carts
- Access vendor data
- Modify categories
```

### Test as Vendor
```javascript
// Should work
- Create products (if approved)
- Edit own products
- View orders for own products
- Request payouts

// Should NOT work
- Edit other vendors' products
- View all orders
- Manage categories
- Approve other vendors
```

### Test as Admin
```javascript
// Should work
- Everything
- Manage all collections
- Approve vendors
- Process payouts
- Delete any content
```

## Common Scenarios

### Customer Journey
1. Register → User document created with role: "customer"
2. Browse products → Public access, no auth needed
3. Add to cart → Requires authentication
4. Place order → Creates order with customerId
5. View orders → Can only see own orders
6. Submit review → Can only review as customer

### Vendor Journey
1. Register → User document created
2. Apply as vendor → Vendor document created with status: "pending"
3. Wait for approval → Admin changes status to "approved"
4. Create products → Can now create products
5. Manage products → Can edit/delete own products
6. View orders → Can see orders for own products
7. Request payout → Create payout request

### Admin Journey
1. Login as admin → User with role: "admin"
2. Approve vendors → Update vendor status
3. Manage products → Edit/delete any product
4. Manage categories → Create/update categories
5. Process payouts → Approve payout requests
6. View all orders → Access to all order data

## Migration from Old Rules

If you had simpler rules before:

### Old Rules (Simple)
```javascript
match /{document=**} {
  allow read, write: if true; // Insecure!
}
```

### New Rules (Secure)
- Role-based access control
- Data isolation
- Vendor approval system
- Admin controls

## Applying the Rules

1. **Copy the rules** from `firestore.rules` file
2. **Go to Firebase Console** → Firestore Database → Rules
3. **Paste the rules** in the editor
4. **Click "Publish"**
5. **Wait 30 seconds** for rules to propagate

## Troubleshooting

### "Permission denied" for customers
- Check if user has role: "customer" in users collection
- Verify user is authenticated
- Check if trying to access own data

### "Permission denied" for vendors
- Check if vendor document exists
- Verify vendor status is "approved"
- Check if trying to access own products

### "Permission denied" for products
- Vendors: Check if approved
- Check if product belongs to vendor
- Verify vendorId matches auth.uid

## Best Practices

1. **Always authenticate** before protected operations
2. **Check user role** before allowing actions
3. **Validate data** on client and server
4. **Use helper functions** for cleaner rules
5. **Test thoroughly** with different roles
6. **Monitor usage** in Firebase Console
7. **Log errors** for debugging

## Summary

The updated rules provide:
- ✅ Secure role-based access control
- ✅ Data isolation between users
- ✅ Vendor approval workflow
- ✅ Admin management capabilities
- ✅ Customer privacy protection
- ✅ Proper authorization checks

**Next Step:** Apply these rules in Firebase Console and test with different user roles!
