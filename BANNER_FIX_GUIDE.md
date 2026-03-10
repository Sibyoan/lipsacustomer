# Banner Image Fix Guide

## What Was Fixed

1. **Empty String Error**: Added validation to filter out banners with empty or invalid image URLs
2. **Image Loading**: Added `loading="eager"` and `h-auto` to ensure images load properly
3. **Null Safety**: Added checks to ensure image URLs exist before rendering `<img>` tags
4. **Fallback Handling**: Fixed array index out of bounds when using fallback banners
5. **Data Mapping**: Improved Firestore data mapping to handle missing fields gracefully and skip invalid banners
6. **Firestore Rules**: Fixed corrupted rules file to allow public read access to banners
7. **Timestamp Conversion**: Properly convert Firestore timestamps to JavaScript Date objects

## How to Add Banners

### Option 1: Using Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `lipsa-aec23`
3. Click on "Firestore Database" in the left menu
4. Click "Start collection" or navigate to existing `banners` collection
5. Add a new document with these fields:

```
title: "Your Banner Title"
image: "https://your-image-url.com/banner.jpg"
mobileImage: "https://your-image-url.com/mobile-banner.jpg" (optional)
link: "/collections/your-collection"
createdAt: (click "Add field" → select "timestamp" → click "Set to current time")
```

### Option 2: Using the Test Script

Run this command to add a test banner:

```bash
node scripts/add-test-banner.js
```

This will add a sample banner with an Unsplash image.

### Option 3: Manual Script

Create your own banners by modifying `scripts/add-test-banner.js`:

```javascript
const banner = {
  title: "Your Custom Banner",
  image: "https://your-desktop-image.jpg",
  mobileImage: "https://your-mobile-image.jpg", // optional
  link: "/your-link",
  createdAt: Timestamp.now()
};
```

## Image Requirements

- **Desktop**: Recommended 1920x650px (aspect ratio 16:5)
- **Mobile**: Recommended 800x400px (aspect ratio 2:1)
- **Format**: JPG, PNG, or WebP
- **Size**: Keep under 200KB for fast loading
- **URL**: Must be publicly accessible (use Cloudinary, Firebase Storage, or any CDN)

## Troubleshooting

### Empty String Error in Console?

If you see: `An empty string ("") was passed to the src attribute`

This means you have banners in Firestore with empty or missing image URLs. To fix:

1. **Check your banners**:
```bash
node scripts/check-banners.js
```

2. **Fix invalid banners** in Firebase Console:
   - Go to Firestore → banners collection
   - Check each banner document
   - Ensure `image` field has a valid URL (not empty)
   - Delete or fix any banners with empty image fields

3. **Or delete all banners and start fresh**:
   - Delete the banners collection in Firebase Console
   - Run: `node scripts/add-test-banner.js`

### Images Not Showing?

1. **Check Console**: Open browser DevTools (F12) and check for errors
2. **Verify URL**: Make sure image URLs are publicly accessible and not empty strings
3. **Check Firestore**: Verify banners exist in Firestore console with valid `image` field
4. **Check Rules**: Ensure Firestore rules allow reading banners (already fixed)
5. **CORS Issues**: If using external images, ensure they allow cross-origin requests
6. **Empty URLs**: The system now automatically filters out banners with empty image URLs

### No Banners Showing?

If you see "No banners available at the moment":
- Add at least one banner to Firestore
- Check that the banner has all required fields
- Verify your Firebase connection is working

### Loading Forever?

If stuck on "Loading banners...":
- Check browser console for errors
- Verify Firebase configuration in `src/lib/firebase.ts`
- Check network tab to see if Firestore request is failing

## Testing

1. Add a banner using one of the methods above
2. Refresh your home page
3. You should see the banner in the hero slider
4. Test clicking the banner to verify the link works
5. Test on mobile to see responsive images

## Next Steps

- Upload your actual banner images to Cloudinary or Firebase Storage
- Update the banner URLs in Firestore
- Add multiple banners for the slider rotation
- Customize the auto-rotation timing (currently 4.5 seconds)
