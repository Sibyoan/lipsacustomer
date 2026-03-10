# Update Existing Category in Firestore

## Your Current Category Structure

I can see you have a category with:
- Document ID: `3TcIqm6BCDBZygZkzcYY` (auto-generated)
- `name`: "Gift"
- `description`: "gift"
- `imageUrl`: "https://res.cloudinary.com/dwhrq9zwo/image..."
- `productCount`: 0
- `createdAt`: March 6, 2026

## Required Updates

To make this category work with the dynamic system, you need to add a `slug` field.

### Option 1: Update via Firebase Console (Recommended)

1. **Open Firebase Console**
   - Go to https://console.firebase.google.com
   - Select your project
   - Navigate to Firestore Database

2. **Find Your Category**
   - Click on `categories` collection
   - Click on document `3TcIqm6BCDBZygZkzcYY`

3. **Add Slug Field**
   - Click "+ Add field"
   - Field name: `slug`
   - Field value: `gift` (lowercase, no spaces)
   - Click "Update"

### Option 2: Better Approach - Recreate with Custom ID

For better organization, it's recommended to use the slug as the document ID:

1. **Create New Category**
   - In `categories` collection, click "Add document"
   - Set Document ID: `gift` (not auto-generated)
   - Add fields:
     ```
     name: "Gift"
     slug: "gift"
     description: "Perfect gifts for every occasion"
     imageUrl: "https://res.cloudinary.com/dwhrq9zwo/image..."
     createdAt: [Current timestamp]
     ```

2. **Delete Old Category**
   - Delete document `3TcIqm6BCDBZygZkzcYY`

3. **Update Products**
   - Update all products that belong to this category
   - Set `categoryId: "gift"`

## Field Name Compatibility

The code now supports both field names:
- ✅ `image` (standard field name)
- ✅ `imageUrl` (your current field name)

Both will work! The code will use whichever is available.

## Recommended Category Structure

For best results, use this structure:

```javascript
// Document ID: "gift" (use slug as ID)
{
  name: "Gift",
  slug: "gift",
  description: "Perfect gifts for every occasion",
  imageUrl: "https://res.cloudinary.com/dwhrq9zwo/image...",
  createdAt: Timestamp
}
```

## Adding More Categories

When adding new categories, follow this pattern:

### Example: Electronics Category

```
Document ID: electronics

Fields:
  name: "Electronics"
  slug: "electronics"
  description: "Latest gadgets and electronics"
  imageUrl: "https://your-cloudinary-url.com/electronics.jpg"
  createdAt: [Current timestamp]
```

### Example: Fashion Category

```
Document ID: fashion

Fields:
  name: "Fashion"
  slug: "fashion"
  description: "Trendy fashion and apparel"
  imageUrl: "https://your-cloudinary-url.com/fashion.jpg"
  createdAt: [Current timestamp]
```

## Linking Products to Categories

When creating or updating products, set the `categoryId` to match the category document ID:

```javascript
// Product document
{
  name: "Wireless Headphones",
  categoryId: "electronics",  // Must match category document ID
  status: "approved",
  price: 2999,
  images: ["https://..."],
  // ... other fields
}
```

## Testing Your Category

1. **Visit Homepage**
   - Go to your website
   - Scroll to "Top Categories" section
   - Your "Gift" category should appear

2. **Click Category**
   - Click on the "Gift" category card
   - Should navigate to `/collections/gift`

3. **Check Products**
   - Products with `categoryId: "gift"` should display
   - Only products with `status: "approved"` will show

## Quick Fix Checklist

- [ ] Add `slug` field to existing category (or recreate with custom ID)
- [ ] Verify `imageUrl` field has valid URL
- [ ] Update products with `categoryId: "gift"`
- [ ] Ensure products have `status: "approved"`
- [ ] Test category appears on homepage
- [ ] Test clicking category navigates correctly
- [ ] Test products display on category page

## Common Issues

### Category not showing on homepage
- Check `slug` field exists
- Verify `imageUrl` is valid
- Check browser console for errors

### Products not showing
- Verify product `categoryId` matches category document ID
- Check product `status` is "approved"
- Ensure Firestore index is created

## Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify all required fields are present
3. Check Firestore security rules allow read access
4. Review `CATEGORY_QUICK_START.md` for detailed instructions
