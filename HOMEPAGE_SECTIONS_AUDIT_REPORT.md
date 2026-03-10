# Homepage Product Sections Audit Report

**Date:** March 10, 2026  
**Auditor:** Kiro AI  
**Objective:** Verify whether homepage product sections are connected to Firebase Firestore or using static hardcoded data

---

## Executive Summary

**CRITICAL FINDING:** All homepage product sections are using **100% HARDCODED STATIC DATA**. None of the sections are connected to Firebase Firestore despite the existence of proper hooks and infrastructure.

---

## Sections Audited

### 1. ✅ Explore Our Range (Price Range Explore)
**File:** `src/components/sections/price-range-explore.tsx`  
**Status:** ⚠️ STATIC DATA (Links Only)

**Current Implementation:**
- Uses hardcoded price ranges: ₹9, ₹29, ₹49, ₹149, ₹249
- Links to collection pages: `/collections/under-{price}`
- Does NOT query Firestore for products
- Only displays emoji icons, not actual products

**Expected Implementation:**
```typescript
// Should query products by price ranges
query(
  collection(db, "products"),
  where("price", ">=", 9),
  where("price", "<=", 29),
  where("status", "==", "approved"),
  limit(3)
)
```

**Issues:**
- No Firestore integration
- No dynamic product display
- Links may lead to empty collection pages if not implemented

---

### 2. ❌ Kitchen Accessories
**File:** `src/components/sections/kitchen-accessories.tsx`  
**Status:** ❌ FULLY HARDCODED

**Current Implementation:**
- Hardcoded array of 6 subcategories
- Static images from Cloudinary CDN
- Static prices (₹367, ₹33, ₹27, ₹32, ₹12, ₹39)
- Links to subcategory pages

**Expected Implementation:**
```typescript
const { products, loading, error } = useProducts({
  categoryId: 'kitchen-accessories',
  limitCount: 12
});
```

**Issues:**
- ❌ No Firestore queries
- ❌ No ProductCard component usage
- ❌ No loading states
- ❌ No error handling
- ❌ Prices are static, not from actual products
- ❌ Won't update when new products are added

---

### 3. ❌ Home Essentials
**File:** `src/components/sections/home-essentials.tsx`  
**Status:** ❌ FULLY HARDCODED

**Current Implementation:**
- Hardcoded array of 6 subcategories
- Static images from Cloudinary CDN
- Static prices (₹31, ₹21, ₹52, ₹24, ₹15, ₹5)
- Links to subcategory pages

**Expected Implementation:**
```typescript
const { products, loading, error } = useProducts({
  categoryId: 'home-essentials',
  limitCount: 12
});
```

**Issues:**
- ❌ No Firestore queries
- ❌ No ProductCard component usage
- ❌ No loading states
- ❌ No error handling
- ❌ Prices are static, not from actual products
- ❌ Won't update when new products are added

---

### 4. ❌ Selling Out Fast
**File:** `src/components/sections/selling-out-fast.tsx`  
**Status:** ❌ FULLY HARDCODED

**Current Implementation:**
- Hardcoded array of 10 products with full details
- Static product data including:
  - IDs, titles, prices, MRP, discounts
  - Ratings and review counts
  - Images from Cloudinary CDN
  - Badge labels
- Custom ProductCard component (not using shared ProductCard)
- Has "Load More" button (non-functional)

**Expected Implementation:**
```typescript
const { products, loading, error } = useProducts({
  bestSelling: true,
  limitCount: 10
});
```

**Issues:**
- ❌ No Firestore queries
- ❌ Not using shared ProductCard component from `src/components/ProductCard.tsx`
- ❌ No loading states
- ❌ No error handling
- ❌ "Load More" button is non-functional
- ❌ Won't update when new best-selling products are added
- ❌ Rating and review data is static

---

### 5. ❌ Electronics
**File:** `src/components/sections/electronics.tsx`  
**Status:** ❌ FULLY HARDCODED

**Current Implementation:**
- Hardcoded array of 6 subcategories
- Static images from Cloudinary CDN
- Static prices (₹119, ₹55, ₹39, ₹105, ₹47, ₹150)
- Links to subcategory pages

**Expected Implementation:**
```typescript
const { products, loading, error } = useProducts({
  categoryId: 'electronics',
  limitCount: 12
});
```

**Issues:**
- ❌ No Firestore queries
- ❌ No ProductCard component usage
- ❌ No loading states
- ❌ No error handling
- ❌ Prices are static, not from actual products
- ❌ Won't update when new products are added

---

### 6. ❌ Baby Essentials
**File:** `src/components/sections/baby-essentials.tsx`  
**Status:** ❌ FULLY HARDCODED

**Current Implementation:**
- Hardcoded array of 6 subcategories
- Static images from Cloudinary CDN
- Static prices (₹28, ₹33, ₹46, ₹13, ₹59, ₹30)
- Links to subcategory pages

**Expected Implementation:**
```typescript
const { products, loading, error } = useProducts({
  categoryId: 'baby',
  limitCount: 12
});
```

**Issues:**
- ❌ No Firestore queries
- ❌ No ProductCard component usage
- ❌ No loading states
- ❌ No error handling
- ❌ Prices are static, not from actual products
- ❌ Won't update when new products are added

---

## Available Infrastructure (NOT BEING USED)

### ✅ Firestore Hooks Available
**File:** `src/hooks/useProducts.ts`

The codebase has a fully functional `useProducts` hook that supports:
- ✅ Category filtering by `categoryId`
- ✅ Feature flags: `featured`, `bestSelling`, `newArrival`
- ✅ Status filtering (approved products only)
- ✅ Search queries
- ✅ Limit control
- ✅ Error handling
- ✅ Loading states

### ✅ ProductCard Component Available
**File:** `src/components/ProductCard.tsx`

A reusable ProductCard component exists that displays:
- ✅ Product name
- ✅ Price and discount price
- ✅ Discount percentage badge
- ✅ Product image
- ✅ Stock status
- ✅ Category label
- ✅ Link to product detail page

**This component is NOT being used in any homepage section.**

---

## Critical Issues Summary

### Data Source Issues
1. ❌ **Zero Firestore Integration** - All sections use hardcoded arrays
2. ❌ **Static Prices** - Prices don't reflect actual product data
3. ❌ **No Dynamic Updates** - Adding products to Firestore won't update homepage
4. ❌ **Inconsistent Data** - Homepage data may not match actual inventory

### Component Issues
5. ❌ **Duplicate ProductCard** - Selling Out Fast has custom card instead of using shared component
6. ❌ **No Loading States** - Users see nothing while data loads
7. ❌ **No Error Handling** - No fallback if data fails to load
8. ❌ **Non-functional Features** - "Load More" button doesn't work

### Architecture Issues
9. ❌ **Unused Infrastructure** - `useProducts` hook exists but isn't used
10. ❌ **Maintenance Burden** - Updating products requires code changes
11. ❌ **Category Mismatch Risk** - Hardcoded categoryIds may not match Firestore

---

## Recommended Actions

### Priority 1: Critical (Immediate)
1. **Integrate Firestore for "Selling Out Fast"**
   - Replace hardcoded products array with `useProducts({ bestSelling: true })`
   - Use shared ProductCard component
   - Add loading and error states
   - Implement functional "Load More" pagination

### Priority 2: High (This Week)
2. **Integrate Firestore for Category Sections**
   - Kitchen Accessories: `useProducts({ categoryId: 'kitchen-accessories' })`
   - Home Essentials: `useProducts({ categoryId: 'home-essentials' })`
   - Electronics: `useProducts({ categoryId: 'electronics' })`
   - Baby Essentials: `useProducts({ categoryId: 'baby' })`

3. **Standardize ProductCard Usage**
   - Remove custom ProductCard from selling-out-fast.tsx
   - Use shared ProductCard component everywhere
   - Ensure consistent product display

### Priority 3: Medium (Next Sprint)
4. **Enhance Price Range Explore**
   - Query actual products by price ranges
   - Display real product previews instead of emojis
   - Show actual product counts per range

5. **Add Loading & Error States**
   - Implement skeleton loaders
   - Add error boundaries
   - Show user-friendly error messages

### Priority 4: Low (Future)
6. **Implement Pagination**
   - Make "Load More" functional
   - Add infinite scroll option
   - Optimize query performance

---

## Example Implementation

### Before (Current - Hardcoded):
```typescript
const products: Product[] = [
  { id:'1', title:'Product 1', price:'47.00', ... },
  { id:'2', title:'Product 2', price:'39.00', ... },
  // ... hardcoded array
];

export default function SellingOutFast() {
  return (
    <section>
      {products.map(p => <ProductCard key={p.id} p={p} />)}
    </section>
  );
}
```

### After (Recommended - Firestore):
```typescript
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

export default function SellingOutFast() {
  const { products, loading, error } = useProducts({
    bestSelling: true,
    limitCount: 10
  });

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
```

---

## Firestore Query Examples

### Kitchen Accessories
```typescript
query(
  collection(db, "products"),
  where("categoryId", "==", "kitchen-accessories"),
  where("status", "==", "approved"),
  orderBy("createdAt", "desc"),
  limit(12)
)
```

### Selling Out Fast
```typescript
query(
  collection(db, "products"),
  where("bestSelling", "==", true),
  where("status", "==", "approved"),
  orderBy("createdAt", "desc"),
  limit(10)
)
```

### Price Range (₹9-₹29)
```typescript
query(
  collection(db, "products"),
  where("price", ">=", 9),
  where("price", "<=", 29),
  where("status", "==", "approved"),
  limit(3)
)
```

---

## Impact Assessment

### Current State Impact
- ❌ **Data Integrity:** Homepage shows outdated/incorrect product information
- ❌ **Maintenance:** Requires developer intervention to update products
- ❌ **Scalability:** Cannot handle dynamic inventory
- ❌ **User Experience:** Users may see products that don't exist or wrong prices

### Post-Implementation Impact
- ✅ **Real-time Updates:** Homepage reflects current inventory
- ✅ **Self-service:** Vendors can add products without code changes
- ✅ **Accurate Pricing:** Prices match actual product data
- ✅ **Better UX:** Loading states, error handling, pagination

---

## Conclusion

The homepage is currently a **static mockup** rather than a dynamic e-commerce platform. While the necessary infrastructure (hooks, components, Firestore) exists, it's not being utilized. This creates a significant gap between the admin/vendor experience (which uses Firestore) and the customer experience (which sees static data).

**Recommendation:** Prioritize integrating Firestore for all product sections, starting with "Selling Out Fast" as a proof of concept, then rolling out to other sections.

---

## Next Steps

1. Review this audit with the development team
2. Prioritize sections for Firestore integration
3. Create implementation tickets for each section
4. Test with actual Firestore data
5. Deploy incrementally (one section at a time)
6. Monitor performance and user experience

---

**Report Generated:** March 10, 2026  
**Status:** ⚠️ CRITICAL - Immediate Action Required
