# Banners Setup Guide

## Overview
The home page hero slider now fetches banners from Firestore instead of using hardcoded demo data.

## Firestore Collection Structure

### Collection: `banners`

Each banner document should have the following fields:

```javascript
{
  title: "Banner Title",           // string (required) - Alt text for the image
  imageUrl: "https://...",          // string (required) - Desktop image URL (or use 'image')
  mobileImageUrl: "https://...",    // string (optional) - Mobile-specific image URL (or use 'mobileImage')
  link: "/collections/sale",        // string (required) - Link when banner is clicked
  isActive: true,                   // boolean (optional) - Set to false to hide banner
  position: 1,                      // number (optional) - For custom ordering (lower = first)
  createdAt: Timestamp              // timestamp (required) - Used for ordering
}
```

**Note**: The system supports both field naming conventions:
- `imageUrl` or `image` for desktop image
- `mobileImageUrl` or `mobileImage` for mobile image

## Example Banner Document

```javascript
{
  title: "Clearance Sale - Get up to 70% Off",
  imageUrl: "https://example.com/banner-desktop.jpg",
  mobileImageUrl: "https://example.com/banner-mobile.jpg",
  link: "/collections/clearance-sale",
  isActive: true,
  position: 1,
  createdAt: firebase.firestore.Timestamp.now()
}
```

**Your current banner structure** (from the screenshot) is already compatible:
```javascript
{
  title: "2",
  imageUrl: "https://res.cloudinary.com/dwhrq9zwo/image...",
  link: "heeeeeeeeeeeeeeeeeeeeee",
  isActive: true,
  position: 2,
  createdAt: March 6, 2026 at 6:24:41 PM UTC-5:30
}
```

## Adding Banners to Firestore

### Option 1: Using Firebase Console
1. Go to Firebase Console → Firestore Database
2. Navigate to the `banners` collection
3. Click "Add document"
4. Add the fields as shown above
5. Click "Save"

### Option 2: Using the Seed Script
You can modify `scripts/seed-firestore.example.js` to include banner data:

```javascript
const banners = [
  {
    title: "Summer Sale",
    image: "https://example.com/summer-desktop.jpg",
    mobileImage: "https://example.com/summer-mobile.jpg",
    link: "/collections/summer-sale",
    createdAt: new Date()
  },
  // Add more banners...
];

// Add to Firestore
for (const banner of banners) {
  await addDoc(collection(db, 'banners'), banner);
}
```

## Image Recommendations

- **Desktop images**: 1920x650px (aspect ratio 16:5)
- **Mobile images**: 800x400px (aspect ratio 2:1)
- Format: JPG or WebP for better performance
- File size: Keep under 200KB for fast loading

## Features

- Banners are automatically ordered by `position` (if set), then by `createdAt` (newest first)
- Only active banners are shown (if `isActive` field exists and is `true`)
- Auto-rotates every 4.5 seconds
- Shows loading state while fetching
- Displays fallback message if no banners exist
- Supports both `image`/`imageUrl` and `mobileImage`/`mobileImageUrl` field names
- Supports separate desktop and mobile images
- Click on banner navigates to the specified link

## Firestore Rules

Make sure your `firestore.rules` allows reading banners:

```
match /banners/{bannerId} {
  allow read: if true;
  allow write: if request.auth != null; // Only authenticated users can write
}
```

## Testing

1. Add at least one banner to Firestore
2. Refresh the home page
3. The banner should appear in the hero slider
4. Test navigation by clicking the banner
5. Test on mobile to see responsive images
