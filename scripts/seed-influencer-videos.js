/**
 * Script to seed sample influencer videos
 * This creates sample data for the influencerVideos collection
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjaSfVpgSpOG5ZnaRUawafzpH6mxHzQhU",
  authDomain: "lipsa-aec23.firebaseapp.com",
  projectId: "lipsa-aec23",
  storageBucket: "lipsa-aec23.firebasestorage.app",
  messagingSenderId: "15009459385",
  appId: "1:15009459385:web:76fea985b4d0ae26e6bf68",
  measurementId: "G-ZXNV16PDF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample influencer videos data
const sampleVideos = [
  {
    productId: "1LabI4WDzwiykj0tTHjl", // Spoons
    productName: "Premium Steel Spoons Set",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    views: 3500,
    price: 299,
    originalPrice: 599,
    discount: 50
  },
  {
    productId: "4WxuGd4m36S7eZ3KhpkO", // Tiffen Box
    productName: "Stainless Steel Tiffin Box",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop",
    views: 4200,
    price: 450,
    originalPrice: 799,
    discount: 44
  },
  {
    productId: "4Xw8ukxe25dOOKAn9xLE", // Portable baby bottle
    productName: "Portable Baby Bottle",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=600&fit=crop",
    views: 8900,
    price: 220,
    originalPrice: 399,
    discount: 45
  },
  {
    productId: "F4KVYiElxiHMfqkU1JEt", // Baby Dress
    productName: "Cute Baby Dress",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=600&fit=crop",
    views: 12500,
    price: 350,
    originalPrice: 699,
    discount: 50
  },
  {
    productId: "8p7C8Kden7Rdotav3Jn8", // cable
    productName: "USB Charging Cable",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    views: 6700,
    price: 199,
    originalPrice: 399,
    discount: 50
  },
  {
    productId: "1LabI4WDzwiykj0tTHjl", // Another spoon variant
    productName: "Elegant Serving Spoons",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
    views: 2800,
    price: 399,
    originalPrice: 799,
    discount: 50
  },
  {
    productId: "4WxuGd4m36S7eZ3KhpkO", // Another tiffin variant
    productName: "Multi-Layer Lunch Box",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop",
    views: 5400,
    price: 599,
    originalPrice: 999,
    discount: 40
  },
  {
    productId: "4Xw8ukxe25dOOKAn9xLE", // Another baby bottle
    productName: "Anti-Colic Baby Bottle",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=600&fit=crop",
    views: 7300,
    price: 299,
    originalPrice: 499,
    discount: 40
  }
];

async function seedInfluencerVideos() {
  try {
    console.log('🎬 Seeding influencer videos...\n');
    
    const videosRef = collection(db, 'influencerVideos');
    let successCount = 0;
    
    for (const video of sampleVideos) {
      try {
        const docRef = await addDoc(videosRef, {
          ...video,
          createdAt: serverTimestamp()
        });
        
        console.log(`✅ Added video: ${video.productName} (ID: ${docRef.id})`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to add video: ${video.productName}`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully seeded ${successCount}/${sampleVideos.length} influencer videos!`);
    
    console.log('\n📋 What was created:');
    console.log('   Collection: influencerVideos');
    console.log('   Documents: 8 sample videos');
    console.log('   Fields: productId, productName, videoUrl, thumbnail, views, price, originalPrice, discount, createdAt');
    
    console.log('\n🧪 Testing:');
    console.log('   1. Start your dev server: npm run dev');
    console.log('   2. Visit: http://localhost:3000');
    console.log('   3. Look for "Top Pick By Influencers" section below Top Categories');
    console.log('   4. Click on any video card to open the modal');
    
    console.log('\n📝 Note:');
    console.log('   - Sample videos use placeholder URLs');
    console.log('   - Thumbnails use Unsplash images');
    console.log('   - Replace with real video URLs and thumbnails in production');
    
  } catch (error) {
    console.error('❌ Error seeding influencer videos:', error);
  }
}

// Run the seeding
if (require.main === module) {
  seedInfluencerVideos()
    .then(() => {
      console.log('\n✨ Seeding complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedInfluencerVideos };