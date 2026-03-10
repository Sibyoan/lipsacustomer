/**
 * Script to check categories and their slugs
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function checkCategories() {
  console.log('🔍 Checking categories...\n');
  
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    
    console.log(`📊 Found ${querySnapshot.size} categories:\n`);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`Category ID: ${doc.id}`);
      console.log(`  Name: ${data.name || 'No name'}`);
      console.log(`  Slug: ${data.slug || 'No slug'}`);
      console.log(`  Image: ${data.image || data.imageUrl || 'No image'}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('❌ Error checking categories:', error);
  }
}

// Run the check
if (require.main === module) {
  checkCategories()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Check failed:', error);
      process.exit(1);
    });
}