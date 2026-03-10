# Switch Influencer Videos from Demo to Production

## Current Status
The homepage is currently using the **demo version** with sample data to showcase the functionality.

## To Switch to Production Mode

### 1. Update Homepage Import
In `src/app/page.tsx`, change:
```typescript
import InfluencerVideos from '@/components/home/InfluencerVideosDemo';
```

To:
```typescript
import InfluencerVideos from '@/components/home/InfluencerVideos';
```

### 2. Add Real Data to Firestore
1. Go to [Firebase Console](https://console.firebase.google.com/project/lipsa-aec23/firestore/data)
2. Create collection: `influencerVideos`
3. Add documents with this structure:

```json
{
  "productId": "actual_product_id",
  "productName": "Product Name",
  "videoUrl": "https://your-cdn.com/video.mp4",
  "thumbnail": "https://your-cdn.com/thumbnail.jpg",
  "views": 3500,
  "price": 299,
  "originalPrice": 599,
  "discount": 50,
  "createdAt": "2024-03-10T12:00:00Z"
}
```

### 3. Test Production Version
1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000`
3. Verify videos load from Firestore
4. Test modal functionality
5. Verify "View Product" links work

## Demo vs Production Differences

| Feature | Demo Version | Production Version |
|---------|-------------|-------------------|
| Data Source | Hardcoded sample data | Firestore collection |
| Loading State | No loading (instant) | Shows loading skeleton |
| Error Handling | No errors | Handles Firestore errors |
| Empty State | Never empty | Shows when no videos |
| Real-time Updates | Static data | Updates when data changes |

## Files to Keep/Remove

**Keep for Production:**
- `src/hooks/useInfluencerVideos.ts`
- `src/components/VideoModal.tsx`
- `src/components/home/InfluencerVideos.tsx`

**Optional to Remove:**
- `src/components/home/InfluencerVideosDemo.tsx` (demo only)

## Quick Switch Command

```bash
# Replace the import in homepage
sed -i 's/InfluencerVideosDemo/InfluencerVideos/g' src/app/page.tsx
```

After switching, the section will show:
- Loading state while fetching from Firestore
- Real videos if data exists
- "No influencer videos available" if collection is empty