# Banner System - Working Configuration

## ✅ Current Status

Your banner system is now properly configured and should be working! The code supports both field naming conventions:

### Supported Field Names

The system accepts banners with either naming convention:

**Option 1: Standard naming**
```javascript
{
  title: "Banner Title",
  image: "https://...",
  mobileImage: "https://...",  // optional
  link: "/collections/sale",
  createdAt: Timestamp
}
```

**Option 2: URL suffix naming (your current format)**
```javascript
{
  title: "Banner Title",
  imageUrl: "https://...",
  mobileImageUrl: "https://...",  // optional
  link: "/collections/sale",
  createdAt: Timestamp,
  isActive: true,              // optional
  position: 1                  // optional
}
```

## Your Current Banner

Based on your Firestore screenshot, you have a banner with:
- ✅ `title`: "2"
- ✅ `imageUrl`: "https://res.cloudinary.com/dwhrq9zwo/image..."
- ✅ `link`: "heeeeeeeeeeeeeeeeeeeeee"
- ✅ `createdAt`: March 6, 2026
- ✅ `isActive`: true
- ✅ `position`: 2

This banner should now display on your home page!

## How It Works

1. **useBanners Hook** fetches banners from Firestore
2. Supports both `image` and `imageUrl` field names
3. Filters out any banners with empty/invalid URLs
4. Orders by `createdAt` (newest first)
5. **HeroSlider Component** displays the banners with auto-rotation

## Testing Your Banner

1. **Refresh your home page** - The banner should appear
2. **Check browser console** - Should see no errors
3. **Click the banner** - Should navigate to the link
4. **Test on mobile** - Should be responsive

## Verify Banners

Run this command to check all banners in Firestore:
```bash
node scripts/check-banners.js
```

This will show:
- All banner fields
- Validation status
- Any issues with the data

## Adding More Banners

### Using Firebase Console

1. Go to Firestore → banners collection
2. Click "Add document"
3. Add fields:
   - `title` (string): "Your Banner Title"
   - `imageUrl` (string): "https://your-image-url.com/banner.jpg"
   - `link` (string): "/collections/your-collection"
   - `createdAt` (timestamp): Click "Set to current time"
   - `isActive` (boolean): true (optional)
   - `position` (number): 1 (optional)

### Using Script

```bash
node scripts/add-test-banner.js
```

## Image Recommendations

- **Desktop**: 1920x650px (aspect ratio 16:5)
- **Mobile**: 800x400px (aspect ratio 2:1)
- **Format**: JPG, PNG, or WebP
- **Size**: Under 200KB for fast loading
- **CDN**: Use Cloudinary, Firebase Storage, or any CDN

## Features

- ✅ Auto-rotation every 4.5 seconds
- ✅ Navigation arrows on hover
- ✅ Dot indicators
- ✅ Click to navigate
- ✅ Responsive (separate mobile images supported)
- ✅ Loading state
- ✅ Fallback banners if images fail
- ✅ Empty URL protection

## Troubleshooting

If banners still don't show:

1. **Clear browser cache** and hard refresh (Ctrl+Shift+R)
2. **Check Firestore rules** - Banners must be publicly readable
3. **Verify image URLs** - Must be publicly accessible
4. **Check console** for any errors
5. **Run check script**: `node scripts/check-banners.js`

## Next Steps

1. Upload your actual banner images to Cloudinary
2. Update the banner `imageUrl` in Firestore
3. Add more banners for variety
4. Set proper `link` values for navigation
5. Use `isActive` to enable/disable banners
6. Use `position` to control display order
