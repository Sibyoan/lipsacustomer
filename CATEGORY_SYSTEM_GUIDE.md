# Category System - Implementation Guide

## Overview

The Top Categories section has been updated to load dynamically from Firebase Firestore. Categories are no longer hardcoded and can be managed through the Firebase Console or admin panel.

---

## What Changed

### Before (Hardcoded)
```typescript
const categories = [
  { name: "Electronics", image: "...", link: "/collections/electronics" },
  // ... hardcoded array
];
```

### After (Dynamic from Firestore)
```typescript
const { categories, loading, error } = useCategories();
// Categories loaded from Firestore
```

---

## Files Modified

### 1. `src/components/sections/top-categories.tsx`
- ✅ Removed hardcoded categories array
- ✅ Added `useCategories()` hook integration
- ✅ Added loading skeleton state
- ✅ Added error handling
- ✅ Changed `<a>` tags to Next.js `<Link>` components
- ✅ Dynamic emoji fallback based on category name

### 2. `src/app/collections/[slug]/page.tsx`
- ✅ Added category fetching with `getCategoryBySlug()`
- ✅ Added 404 page for non-existent categories
- ✅ Display category name and description from Firestore
- ✅ Improved loading and error states
- ✅ Better empty state messaging
- ✅ Product count display

### 3. `scripts/seed-categories.js` (New)
- ✅ Created new seed script with proper category structure
- ✅ Includes sample categories with slugs
- ✅ Includes sample products with matching categoryIds
- ✅ Uses custom document IDs for categories

---

## Firestore Data Structure

### Categories Collection

Each category document should have this structure:

```javascript
// Document ID: "electronics" (used as categoryId in products)
{
  name: "Electronics",
  slug: "electronics",  // URL-friendly version
  description: "Browse our latest electronics and gadgets",
  image: "https://images.unsplash.com/photo-...",
  createdAt: Timestamp
}
```

**Required Fields:**
- `name` (string): Display name of the category
- `slug` (string): URL-friendly identifier (must match document ID)
- `image` (string): Category image URL
- `createdAt` (Timestamp): Creation date

**Optional Fields:**
- `description` (string): Category description
- `icon` (string): Icon identifier

### Products Collection

Products must reference categories using `categoryId`:

```javascript
{
  name: "Wireless Headphones",
  categoryId: "electronics",  // Must match category document ID
  category: "Electronics",     // Display name (optional)
  status: "approved",          // Required for filtering
  // ... other fields
}
```

---

## How to Add Categories

### Method 1: Using Firebase Console

1. Go to Firebase Console → Firestore Database
2. Navigate to `categories` collection
3. Click "Add Document"
4. Set Document ID to the slug (e.g., "electronics")
5. Add fields:
   ```
   name: "Electronics"
   slug: "electronics"
   description: "Browse our electronics"
   image: "https://your-image-url.com/image.jpg"
   createdAt: [Current timestamp]
   ```

### Method 2: Using Seed Script

1. Update `scripts/seed-categories.js` with your categories
2. Install dependencies: `npm install firebase-admin`
3. Download service account key from Firebase Console
4. Update the service account path in the script
5. Run: `node scripts/seed-categories.js`

### Method 3: Programmatically

```typescript
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function addCategory() {
  const categoryId = 'electronics';
  await setDoc(doc(db, 'categories', categoryId), {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Browse our electronics',
    image: 'https://...',
    createdAt: new Date()
  });
}
```

---

## Category-Product Relationship

### Important Rules

1. **Category Document ID = Product categoryId**
   ```
   Category: categories/electronics
   Product: { categoryId: "electronics" }
   ```

2. **Slug must match Document ID**
   ```
   Document ID: "electronics"
   slug: "electronics"
   ```

3. **Products must have status = "approved"**
   ```
   Only products with status: "approved" will be displayed
   ```

### Example Flow

```
1. Create category with ID "electronics"
2. Create product with categoryId: "electronics"
3. User clicks category on homepage
4. Navigates to /collections/electronics
5. Page fetches category by slug "electronics"
6. Page fetches products where categoryId == "electronics"
7. Products displayed
```

---

## Testing the Implementation

### 1. Test Category Display

Visit homepage and verify:
- [ ] Categories load from Firestore
- [ ] Category images display correctly
- [ ] Category names are correct
- [ ] Loading skeleton shows while fetching
- [ ] No errors in console

### 2. Test Category Navigation

Click a category and verify:
- [ ] Navigates to `/collections/[slug]`
- [ ] Category name displays correctly
- [ ] Category description shows (if available)
- [ ] Products load for that category
- [ ] Only approved products are shown

### 3. Test Edge Cases

- [ ] Empty category (no products) shows proper message
- [ ] Invalid category slug shows 404 page
- [ ] Image load errors show emoji fallback
- [ ] Loading states work correctly

---

## Troubleshooting

### Categories not showing on homepage

**Problem**: Homepage shows loading forever or no categories

**Solutions**:
1. Check Firestore rules allow public read access to `categories` collection
2. Verify categories exist in Firestore
3. Check browser console for errors
4. Verify Firebase is initialized correctly

### Products not showing on category page

**Problem**: Category page shows "No products found"

**Solutions**:
1. Verify products have `categoryId` matching the category document ID
2. Check products have `status: "approved"`
3. Verify Firestore composite index exists:
   - Collection: `products`
   - Fields: `status` (Ascending), `categoryId` (Ascending), `createdAt` (Descending)
4. Check browser console for Firestore errors

### Category slug mismatch

**Problem**: Clicking category shows 404

**Solutions**:
1. Ensure category `slug` field matches document ID
2. Verify `getCategoryBySlug()` function works correctly
3. Check category exists in Firestore

### Images not loading

**Problem**: Category images show emoji fallback

**Solutions**:
1. Verify image URLs are valid and accessible
2. Check CORS settings if using external images
3. Use Unsplash or similar CDN for reliable images

---

## Migration from Hardcoded Categories

If you have existing hardcoded categories, follow these steps:

### Step 1: Create Categories in Firestore

For each hardcoded category, create a Firestore document:

```javascript
// Old hardcoded
{ name: "Electronics", link: "/collections/electronics" }

// New Firestore document (ID: "electronics")
{
  name: "Electronics",
  slug: "electronics",
  image: "https://...",
  createdAt: new Date()
}
```

### Step 2: Update Products

Ensure all products have `categoryId` matching category document IDs:

```javascript
// Update products
{
  name: "Product Name",
  categoryId: "electronics",  // Must match category ID
  status: "approved",
  // ...
}
```

### Step 3: Test

1. Visit homepage - categories should load from Firestore
2. Click each category - products should display
3. Verify all links work correctly

### Step 4: Remove Hardcoded Data

The hardcoded categories array has already been removed from `top-categories.tsx`.

---

## Firestore Security Rules

Ensure your Firestore rules allow public read access to categories:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories - public read
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Products - public read, filtered by status
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Required Firestore Indexes

Create these composite indexes in Firebase Console:

### Index 1: Products by Category
- Collection: `products`
- Fields:
  - `status` (Ascending)
  - `categoryId` (Ascending)
  - `createdAt` (Descending)

### Index 2: Products by Status
- Collection: `products`
- Fields:
  - `status` (Ascending)
  - `createdAt` (Descending)

---

## Sample Categories

Here are some suggested categories to get started:

```javascript
const sampleCategories = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  { id: 'home-kitchen', name: 'Home & Kitchen', slug: 'home-kitchen' },
  { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  { id: 'toys', name: 'Toys & Games', slug: 'toys' },
  { id: 'sports', name: 'Sports & Outdoors', slug: 'sports' },
  { id: 'books', name: 'Books & Stationery', slug: 'books' },
  { id: 'health', name: 'Health & Wellness', slug: 'health' },
  { id: 'automotive', name: 'Automotive', slug: 'automotive' },
  { id: 'garden', name: 'Garden & Outdoor', slug: 'garden' }
];
```

---

## Benefits of Dynamic Categories

1. **No Code Changes**: Add/remove categories without deploying code
2. **Admin Control**: Manage categories from Firebase Console or admin panel
3. **Scalable**: Easily add hundreds of categories
4. **Consistent**: Single source of truth for category data
5. **SEO Friendly**: Dynamic metadata for each category page
6. **Maintainable**: Easier to update category information

---

## Next Steps

1. **Seed Initial Categories**: Run `node scripts/seed-categories.js`
2. **Test Navigation**: Click through categories on homepage
3. **Add More Categories**: Use Firebase Console to add categories
4. **Update Products**: Ensure products have correct `categoryId`
5. **Build Admin Panel**: Create UI for managing categories (future enhancement)

---

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify Firestore rules and indexes
3. Review the troubleshooting section above
4. Check Firebase Console for data structure
5. Ensure all required fields are present in documents

---

## Summary

The category system is now fully dynamic and connected to Firebase Firestore. Categories can be managed without code changes, and the system automatically handles:

- Loading categories from Firestore
- Category navigation
- Product filtering by category
- 404 handling for invalid categories
- Loading and error states
- Image fallbacks

The implementation follows best practices for Next.js, React, and Firebase integration.
