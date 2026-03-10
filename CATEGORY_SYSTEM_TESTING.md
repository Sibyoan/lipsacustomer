# Category System Testing Guide

## Quick Verification Steps

### 1. Run the Verification Script

```bash
cd scripts
node verify-category-system.js
```

**Expected Output:**
```
✅ Kitchen Accessories: Using categorySlug correctly (kitchen-accessories)
✅ Home Essentials: Using categorySlug correctly (home-essentials)  
✅ Electronics: Using categorySlug correctly (electronics)
✅ Baby Essentials: Using categorySlug correctly (baby-essentials)
✅ Selling Out Fast: Using bestSelling flag correctly
```

### 2. Test Homepage Sections

Visit `http://localhost:3000/` and verify:

- ✅ Kitchen Accessories section loads products
- ✅ Home Essentials section loads products  
- ✅ Electronics section loads products
- ✅ Baby Essentials section loads products
- ✅ Selling Out Fast section loads products
- ✅ All sections show loading states initially
- ✅ "View All" links work correctly

### 3. Test Category Collection Pages

Visit these URLs to test category filtering:

- `http://localhost:3000/collections/kitchen-accessories`
- `http://localhost:3000/collections/home-essentials`
- `http://localhost:3000/collections/electronics`
- `http://localhost:3000/collections/baby-essentials`

### 4. Check Browser Console

Open Developer Tools → Console and verify:

- ✅ No Firestore permission errors
- ✅ No "missing index" errors
- ✅ Successful query logs (if logging enabled)

## Fix Missing Data (If Needed)

### Run Data Migration Script

If products are missing categorySlug fields:

```bash
cd scripts
node fix-product-category-slugs.js
```

### Create Firestore Indexes

If you see "missing index" errors, create these composite indexes in Firebase Console:

1. **Products - Category Filtering:**
   - Collection: `products`
   - Fields: `status` (ASC), `categorySlug` (ASC), `createdAt` (DESC)

2. **Products - Best Selling:**
   - Collection: `products`  
   - Fields: `status` (ASC), `bestSelling` (ASC), `createdAt` (DESC)

## Expected Firestore Queries

The system should generate these queries:

```javascript
// Kitchen Accessories
query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  where('categorySlug', '==', 'kitchen-accessories'),
  orderBy('createdAt', 'desc'),
  limit(12)
)

// Home Essentials  
query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  where('categorySlug', '==', 'home-essentials'),
  orderBy('createdAt', 'desc'),
  limit(12)
)

// Electronics
query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  where('categorySlug', '==', 'electronics'),
  orderBy('createdAt', 'desc'),
  limit(12)
)

// Baby Essentials
query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  where('categorySlug', '==', 'baby-essentials'),
  orderBy('createdAt', 'desc'),
  limit(12)
)

// Selling Out Fast
query(
  collection(db, 'products'),
  where('status', '==', 'approved'),
  where('bestSelling', '==', true),
  orderBy('createdAt', 'desc'),
  limit(10)
)
```

## Troubleshooting

### No Products Showing

1. **Check product status:** Ensure products have `status: 'approved'`
2. **Check categorySlug:** Run the migration script to add missing slugs
3. **Check Firestore rules:** Verify public read access to products collection
4. **Check indexes:** Create required composite indexes

### Permission Errors

1. **Firestore Rules:** Ensure `allow list, get: if true;` for products collection
2. **Authentication:** Check if auth is interfering with public queries

### Performance Issues

1. **Indexes:** Create all required composite indexes
2. **Limits:** Verify reasonable limits (10-12 products per section)
3. **Caching:** Check React hook dependency arrays

## Success Criteria

✅ **System is working correctly when:**

- All homepage sections load products without errors
- Category collection pages work correctly  
- No console errors or warnings
- Reasonable loading times (< 2 seconds)
- Proper loading states and error handling
- Consistent categorySlug usage across all sections

---

**Last Updated:** March 10, 2026  
**Status:** Ready for Testing