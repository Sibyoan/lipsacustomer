# Influencer Videos Section - Setup Guide

## Overview

The "Top Pick By Influencers" section has been successfully implemented on the homepage. It displays vertical video cards similar to Instagram Reels or TikTok, allowing users to watch product promotion videos and click through to product pages.

## Files Created

1. **Component**: `src/components/home/InfluencerVideos.tsx`
2. **Homepage Integration**: Updated `src/app/page.tsx`
3. **Firestore Rules**: Updated `firestore.rules`
4. **Seeding Script**: `scripts/seed-influencer-videos.js`

## Features Implemented

### ✅ Component Features
- **Horizontal scroll carousel** with touch/swipe support
- **Vertical video cards** (9:16 aspect ratio, 180px × 320px)
- **Video thumbnails** with play button overlay
- **Views badge** (formatted as 3K, 4K, 35K, etc.)
- **Product information** (name, price, discount)
- **Modal video player** with HTML5 video controls
- **Responsive design** (2 cards on mobile, 5-6 on desktop)

### ✅ UI Elements
- **Play button overlay** with hover effects
- **Views badge** in top-left corner
- **Discount badge** in top-right corner
- **Product details** below thumbnail
- **Price display** with strikethrough original price
- **Loading states** with skeleton animations
- **Error handling** with user-friendly messages

### ✅ Modal Features
- **Full video player** with controls
- **Product details** below video
- **"View Product" button** (opens in new tab)
- **Close button** and backdrop click to close
- **Responsive modal** design

## Data Structure

### Firestore Collection: `influencerVideos`

```typescript
{
  id: string,
  productId: string,           // Reference to product
  productName: string,         // Product display name
  videoUrl: string,           // Video file URL
  thumbnail: string,          // Video thumbnail image URL
  views: number,              // View count (3500, 12500, etc.)
  price: number,              // Current price
  originalPrice: number,      // Original price (for discount calculation)
  discount: number,           // Discount percentage
  createdAt: timestamp        // Creation date
}
```

## Manual Setup Required

Since the seeding script requires admin authentication, you need to manually add sample data:

### 1. Add Firestore Rules (Already Done)

The rules have been updated to allow public read access to `influencerVideos` collection.

### 2. Create Sample Data

Go to [Firebase Console](https://console.firebase.google.com/project/lipsa-aec23/firestore/data) and create the `influencerVideos` collection with these sample documents:

#### Document 1:
```json
{
  "productId": "sample-product-1",
  "productName": "Acrylic Jewellery Container",
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "thumbnail": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
  "views": 3500,
  "price": 220,
  "originalPrice": 699,
  "discount": 69,
  "createdAt": "2024-03-10T12:00:00Z"
}
```

#### Document 2:
```json
{
  "productId": "sample-product-2",
  "productName": "Wireless Bluetooth Headphones", 
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop",
  "views": 12500,
  "price": 1999,
  "originalPrice": 4999,
  "discount": 60,
  "createdAt": "2024-03-10T11:00:00Z"
}
```

#### Document 3:
```json
{
  "productId": "sample-product-3",
  "productName": "Smart Fitness Watch",
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop", 
  "views": 8200,
  "price": 2499,
  "originalPrice": 5999,
  "discount": 58,
  "createdAt": "2024-03-10T10:00:00Z"
}
```

#### Document 4:
```json
{
  "productId": "sample-product-4",
  "productName": "Kitchen Knife Set",
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "thumbnail": "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
  "views": 5600,
  "price": 899,
  "originalPrice": 1999,
  "discount": 55,
  "createdAt": "2024-03-10T09:00:00Z"
}
```

#### Document 5:
```json
{
  "productId": "sample-product-5", 
  "productName": "Portable Phone Charger",
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "thumbnail": "https://images.unsplash.com/photo-1609592806596-4d8b5b5e7e0a?w=400&h=600&fit=crop",
  "views": 15300,
  "price": 1299,
  "originalPrice": 2499,
  "discount": 48,
  "createdAt": "2024-03-10T08:00:00Z"
}
```

## Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Visit Homepage
```
http://localhost:3000
```

### 3. Look for Section
The "Top Pick By Influencers" section appears directly below the "Top Categories" section.

### 4. Test Features
- **Horizontal scrolling** on desktop
- **Touch/swipe scrolling** on mobile
- **Click video cards** to open modal
- **Play videos** in modal
- **Click "View Product"** button
- **Close modal** with X button or backdrop click

## Expected Behavior

### Desktop (1200px+)
- Shows 5-6 video cards per row
- Horizontal scroll with mouse wheel or drag
- Hover effects on cards

### Tablet (768px - 1199px)
- Shows 3-4 video cards per row
- Touch scroll support

### Mobile (< 768px)
- Shows 2 video cards per screen
- Swipe navigation
- Touch-optimized modal

## Customization

### Styling
All styles use TailwindCSS and can be customized in the component file.

### Video Sources
- Replace sample video URLs with actual influencer content
- Use proper video hosting (Cloudinary, AWS S3, etc.)
- Ensure videos are optimized for web (MP4, H.264)

### Product Integration
- Update `productId` to match actual product IDs
- Implement proper product page routing
- Add analytics tracking for video views

## Production Considerations

1. **Video Hosting**: Use a proper CDN for video files
2. **Thumbnails**: Generate video thumbnails automatically
3. **Analytics**: Track video views and click-through rates
4. **Performance**: Lazy load videos and optimize file sizes
5. **Content Management**: Build admin interface for managing videos

## Status

✅ **Component implemented and ready**
✅ **Homepage integration complete**
✅ **Firestore rules updated**
✅ **Responsive design working**
⚠️ **Requires manual data entry** (due to permission restrictions)

After adding the sample data manually, the section will be fully functional!