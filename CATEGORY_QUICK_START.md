# Category System - Quick Start Guide

## ✅ What's Been Fixed

The Top Categories section now loads dynamically from Firebase Firestore instead of using hardcoded data.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Seed Categories

Run the seed script to add sample categories:

```bash
# Install firebase-admin if not already installed
npm install firebase-admin

# Download service account key from Firebase Console
# Settings → Project Settings → Service Accounts → Generate New Private Key

# Update the path in scripts/seed-categories.js
# Then run:
node scripts/seed-categories.js
```

### Step 2: Verify in Firebase Console

1. Go to Firebase Console → Firestore Database
2. Check `categories` collection exists
3. Verify each category has: `name`, `slug`, `image`, `createdAt`

### Step 3: Test on Website

1. Visit your homepage
2. Scroll to "Top Categories" section
3. Click a category
4. Verify products load correctly

---

## 📋 Category Structure

Each category in Firestore should look like this:

```javascript
// Document ID: "electronics"
{
  name: "Electronics",
  slug: "electronics",
  description: "Browse our electronics",
  image: "https://images.unsplash.com/photo-...",
  createdAt: Timestamp
}
```

---

## 🔗 Linking Products to Categories

Products must have `categoryId` matching the category document ID:

```javascript
// Product document
{
  name: "Wireless Headphones",
  categoryId: "electronics",  // ← Must match category ID
  status: "approved",         // ← Required
  // ... other fields
}
```

---

## ➕ Adding New Categories

### Option 1: Firebase Console (Easiest)

1. Go to Firestore → `categories` collection
2. Click "Add Document"
3. Set Document ID: `your-category-slug`
4. Add fields:
   - `name`: "Your Category Name"
   - `slug`: "your-category-slug"
   - `image`: "https://your-image-url.com/image.jpg"
   - `description`: "Category description"
   - `createdAt`: [Current timestamp]

### Option 2: Update Seed Script

1. Edit `scripts/seed-categories.js`
2. Add your category to the array
3. Run: `node scripts/seed-categories.js`

---

## 🔍 Troubleshooting

### Categories not showing?

**Check:**
- [ ] Categories exist in Firestore `categories` collection
- [ ] Firestore rules allow public read access
- [ ] Browser console for errors

### Products not showing?

**Check:**
- [ ] Products have `categoryId` matching category document ID
- [ ] Products have `status: "approved"`
- [ ] Firestore composite index exists (see below)

### Required Firestore Index

Create this index in Firebase Console → Firestore → Indexes:

- Collection: `products`
- Fields:
  - `status` (Ascending)
  - `categoryId` (Ascending)
  - `createdAt` (Descending)

---

## 📊 Sample Categories

Use these as a starting point:

| ID | Name | Slug |
|---|---|---|
| electronics | Electronics | electronics |
| fashion | Fashion | fashion |
| home-kitchen | Home & Kitchen | home-kitchen |
| beauty | Beauty & Personal Care | beauty |
| toys | Toys & Games | toys |
| sports | Sports & Outdoors | sports |
| books | Books & Stationery | books |
| health | Health & Wellness | health |

---

## ✨ Features

- ✅ Dynamic category loading from Firestore
- ✅ Loading skeleton while fetching
- ✅ Error handling
- ✅ 404 page for invalid categories
- ✅ Category descriptions
- ✅ Image fallback with emojis
- ✅ Product count display
- ✅ Breadcrumb navigation
- ✅ Client-side navigation (no page reload)

---

## 📝 Files Changed

- `src/components/sections/top-categories.tsx` - Now uses `useCategories()` hook
- `src/app/collections/[slug]/page.tsx` - Enhanced with category validation
- `scripts/seed-categories.js` - New seed script with proper structure

---

## 🎯 Next Steps

1. Run seed script to add categories
2. Test category navigation
3. Add your own categories via Firebase Console
4. Update products with correct `categoryId`
5. Build admin panel for category management (optional)

---

## 📚 Full Documentation

For detailed information, see:
- `CATEGORY_SYSTEM_GUIDE.md` - Complete implementation guide
- `TOP_CATEGORIES_AUDIT_REPORT.md` - Audit findings and fixes

---

## 🆘 Need Help?

Common issues and solutions:

**"No categories showing"**
→ Run seed script or add categories manually in Firebase Console

**"Products not loading"**
→ Check product `categoryId` matches category document ID

**"Category not found"**
→ Verify category `slug` field matches document ID

**"Firestore permission denied"**
→ Update Firestore rules to allow public read on categories

---

That's it! Your category system is now fully dynamic and ready to use. 🎉
