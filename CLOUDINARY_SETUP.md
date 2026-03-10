# Cloudinary Image Storage Setup

## Overview

This project uses **Cloudinary** for image storage instead of Firebase Storage. Cloudinary provides:
- Free tier with generous limits
- Automatic image optimization
- CDN delivery
- Image transformations
- Easy URL-based access

## Why Cloudinary?

- ✅ Better performance with CDN
- ✅ Automatic image optimization
- ✅ On-the-fly image transformations
- ✅ No Firebase Storage costs
- ✅ Easier to manage and scale
- ✅ Direct URL access

## Setup Cloudinary

### 1. Create Account

1. Go to [Cloudinary](https://cloudinary.com)
2. Click "Sign Up for Free"
3. Create your account
4. Verify your email

### 2. Get Your Credentials

After logging in, you'll see your dashboard with:
- **Cloud Name**: `your-cloud-name`
- **API Key**: `123456789012345`
- **API Secret**: `abcdefghijklmnopqrstuvwxyz123`

**Important:** Keep your API Secret secure!

### 3. Configure Upload Presets (Optional)

For easier uploads without authentication:

1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Set:
   - Preset name: `products` (or any name)
   - Signing Mode: `Unsigned` (for client-side uploads)
   - Folder: `products` (optional)
5. Save

Repeat for other folders: `categories`, `banners`, `users`

## Image URL Structure

Cloudinary URLs follow this pattern:
```
https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{version}/{folder}/{filename}
```

### Examples

**Basic URL:**
```
https://res.cloudinary.com/demo/image/upload/sample.jpg
```

**With folder:**
```
https://res.cloudinary.com/demo/image/upload/products/headphones.jpg
```

**With transformations (resize to 400x400):**
```
https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/products/headphones.jpg
```

**With quality optimization:**
```
https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/products/headphones.jpg
```

## Using Cloudinary URLs in Firestore

### Product Document
```javascript
{
  id: "prod123",
  name: "Wireless Headphones",
  description: "High-quality wireless headphones",
  price: 2999,
  discountPrice: 1999,
  category: "electronics",
  images: [
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1/products/headphones-1.jpg",
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1/products/headphones-2.jpg",
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1/products/headphones-3.jpg"
  ],
  vendorId: "vendor123",
  stock: 50,
  status: "approved",
  createdAt: new Date()
}
```

### Category Document
```javascript
{
  id: "cat123",
  name: "Electronics",
  image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/categories/electronics.jpg",
  createdAt: new Date()
}
```

### Banner Document
```javascript
{
  id: "banner123",
  title: "Summer Sale",
  image: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/banners/summer-sale.jpg",
  link: "/collections/summer-sale",
  createdAt: new Date()
}
```

## Upload Methods

### Method 1: Manual Upload (Dashboard)

1. Go to Cloudinary Dashboard
2. Click "Media Library"
3. Click "Upload"
4. Select files
5. Organize into folders
6. Copy the URL
7. Use in Firestore

### Method 2: Upload Widget (Recommended for Admin Panel)

If you're building an admin panel, use Cloudinary's Upload Widget:

```javascript
// Install cloudinary package
npm install cloudinary-react

// Example upload component
import { CloudinaryContext, Image } from 'cloudinary-react';

const ImageUpload = () => {
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'your-cloud-name',
        uploadPreset: 'products',
        folder: 'products',
        sources: ['local', 'url', 'camera'],
        multiple: true,
        maxFiles: 5
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          console.log('Uploaded:', result.info.secure_url);
          // Save URL to Firestore
        }
      }
    );
  };

  return (
    <button onClick={uploadWidget}>
      Upload Images
    </button>
  );
};
```

### Method 3: Direct API Upload (Server-side)

For server-side uploads (Node.js):

```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
});

// Upload image
const result = await cloudinary.uploader.upload('path/to/image.jpg', {
  folder: 'products',
  public_id: 'product-123'
});

console.log('URL:', result.secure_url);
```

## Image Optimization

### Automatic Optimization
Add these parameters to any Cloudinary URL:
- `q_auto` - Automatic quality
- `f_auto` - Automatic format (WebP, AVIF)

```
https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/products/image.jpg
```

### Responsive Images
Different sizes for different devices:

```javascript
// Thumbnail (200x200)
const thumbnail = `https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill/products/image.jpg`;

// Medium (400x400)
const medium = `https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill/products/image.jpg`;

// Large (800x800)
const large = `https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill/products/image.jpg`;
```

### Common Transformations

```javascript
// Resize and crop
w_400,h_400,c_fill

// Resize and maintain aspect ratio
w_400,c_scale

// Add quality optimization
q_auto,f_auto

// Blur background
e_blur:1000

// Add border
bo_5px_solid_black

// Rounded corners
r_20

// Grayscale
e_grayscale
```

## Best Practices

### 1. Organize with Folders
```
products/
  electronics/
  fashion/
  home/
categories/
banners/
users/
vendors/
```

### 2. Use Descriptive Names
```
✅ products/wireless-headphones-black.jpg
❌ products/img123.jpg
```

### 3. Always Use HTTPS
```
✅ https://res.cloudinary.com/...
❌ http://res.cloudinary.com/...
```

### 4. Optimize Images
```
✅ https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/image.jpg
❌ https://res.cloudinary.com/demo/image/upload/image.jpg
```

### 5. Use Appropriate Sizes
```javascript
// Product card (small)
w_300,h_300,c_fill

// Product details (medium)
w_600,h_600,c_fill

// Full view (large)
w_1200,h_1200,c_fill
```

## Integration with Your App

### Update Product Card Component

```typescript
// src/components/ProductCard.tsx
export default function ProductCard({ product }: ProductCardProps) {
  // Use Cloudinary transformations for optimized images
  const imageUrl = product.images[0]?.includes('cloudinary.com')
    ? product.images[0].replace('/upload/', '/upload/w_300,h_300,c_fill,q_auto,f_auto/')
    : product.images[0];

  return (
    <div className="product-card">
      <img src={imageUrl || '/placeholder.jpg'} alt={product.name} />
      {/* ... rest of component */}
    </div>
  );
}
```

### Create Image Helper

```typescript
// src/lib/cloudinary-helpers.ts
export const getOptimizedImageUrl = (
  url: string,
  width: number = 400,
  height: number = 400
): string => {
  if (!url || !url.includes('cloudinary.com')) {
    return url || '/placeholder.jpg';
  }

  // Insert transformations
  return url.replace(
    '/upload/',
    `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
  );
};

// Usage
const thumbnailUrl = getOptimizedImageUrl(product.images[0], 200, 200);
const mediumUrl = getOptimizedImageUrl(product.images[0], 400, 400);
const largeUrl = getOptimizedImageUrl(product.images[0], 800, 800);
```

## Free Tier Limits

Cloudinary free tier includes:
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ Unlimited transformations
- ✅ CDN delivery
- ✅ Image optimization

This is more than enough for most small to medium projects!

## Troubleshooting

### Images not loading?
- Check if URL is correct
- Verify cloud name is correct
- Ensure image is uploaded to Cloudinary
- Check browser console for errors

### Images loading slowly?
- Add `q_auto,f_auto` to URLs
- Use appropriate image sizes
- Enable CDN caching

### Upload failing?
- Check upload preset is unsigned
- Verify API credentials
- Check file size limits
- Ensure file format is supported

## Migration from Firebase Storage

If you were using Firebase Storage:

1. Download all images from Firebase Storage
2. Upload to Cloudinary (organized in folders)
3. Update Firestore documents with new Cloudinary URLs
4. Test all images are loading
5. Delete Firebase Storage files (optional)

## Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Upload Widget](https://cloudinary.com/documentation/upload_widget)
- [React SDK](https://cloudinary.com/documentation/react_integration)

## Summary

✅ Cloudinary is configured for image storage
✅ Use Cloudinary URLs in Firestore documents
✅ Apply transformations for optimization
✅ Organize images in folders
✅ No Firebase Storage rules needed

**Next Step:** Upload your product images to Cloudinary and use the URLs in Firestore!
