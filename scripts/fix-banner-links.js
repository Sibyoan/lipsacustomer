// Script to fix banner links in Firestore
// Run with: node scripts/fix-banner-links.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc, query, orderBy } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBjaSfVpgSpOG5ZnaRUawafzpH6mxHzQhU",
  authDomain: "lipsa-aec23.firebaseapp.com",
  projectId: "lipsa-aec23",
  storageBucket: "lipsa-aec23.firebasestorage.app",
  messagingSenderId: "15009459385",
  appId: "1:15009459385:web:76fea985b4d0ae26e6bf68",
  measurementId: "G-ZXNV16PDF4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixBannerLinks() {
  try {
    console.log('🔧 Fixing banner links in Firestore...\n');
    
    const bannersRef = collection(db, 'banners');
    const q = query(bannersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('❌ No banners found in Firestore');
      process.exit(0);
    }
    
    console.log(`Found ${querySnapshot.size} banner(s) to fix:\n`);
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      const bannerId = docSnapshot.id;
      
      console.log(`Fixing Banner: ${data.title || 'Untitled'} (ID: ${bannerId})`);
      console.log(`  Current link: ${data.link}`);
      
      // Determine appropriate link based on banner content
      let newLink = '/';
      
      if (data.title === 'banner' || data.title === '2') {
        // For generic banners, link to collections page
        newLink = '/collections/all';
      } else if (data.title.toLowerCase().includes('sale')) {
        newLink = '/collections/sale';
      } else if (data.title.toLowerCase().includes('new')) {
        newLink = '/collections/new-arrivals';
      } else {
        // Default to home page for banners
        newLink = '/';
      }
      
      // Update the banner link
      await updateDoc(doc(db, 'banners', bannerId), {
        link: newLink
      });
      
      console.log(`  ✅ Updated link to: ${newLink}\n`);
    }
    
    console.log('🎉 All banner links have been fixed!');
    console.log('\nBanners will now redirect to appropriate pages when clicked.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing banner links:', error);
    process.exit(1);
  }
}

fixBannerLinks();