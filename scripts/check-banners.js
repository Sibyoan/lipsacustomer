// Script to check banners in Firestore
// Run with: node scripts/check-banners.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy } = require('firebase/firestore');
const { firebaseConfig } = require('./firebase-config');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkBanners() {
  try {
    console.log('🔍 Checking banners in Firestore...\n');
    
    const bannersRef = collection(db, 'banners');
    const q = query(bannersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('❌ No banners found in Firestore');
      console.log('\nTo add a test banner, run: node scripts/add-test-banner.js');
      process.exit(0);
    }
    
    console.log(`✅ Found ${querySnapshot.size} banner(s):\n`);
    
    querySnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      const imageUrl = data.image || data.imageUrl || '';
      const mobileImageUrl = data.mobileImage || data.mobileImageUrl || '';
      
      console.log(`Banner ${index + 1}:`);
      console.log(`  ID: ${doc.id}`);
      console.log(`  Title: ${data.title || '❌ MISSING'}`);
      console.log(`  Image: ${imageUrl || '❌ MISSING'}`);
      console.log(`  Mobile Image: ${mobileImageUrl || '(not set)'}`);
      console.log(`  Link: ${data.link || '❌ MISSING'}`);
      console.log(`  Created: ${data.createdAt?.toDate() || '❌ MISSING'}`);
      console.log(`  Is Active: ${data.isActive !== undefined ? data.isActive : '(not set)'}`);
      console.log(`  Position: ${data.position !== undefined ? data.position : '(not set)'}`);
      
      // Validation
      const issues = [];
      if (!data.title || data.title.trim() === '') issues.push('Missing title');
      if (!imageUrl || imageUrl.trim() === '') issues.push('Missing or empty image URL');
      if (!data.link || data.link.trim() === '') issues.push('Missing link');
      if (!data.createdAt) issues.push('Missing createdAt timestamp');
      
      if (issues.length > 0) {
        console.log(`  ⚠️  Issues: ${issues.join(', ')}`);
      } else {
        console.log(`  ✅ Valid banner`);
      }
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking banners:', error);
    process.exit(1);
  }
}

checkBanners();
