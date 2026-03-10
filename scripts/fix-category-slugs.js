/**
 * Script to fix missing category slugs
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');

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

// Function to generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Expected category mappings
const categoryMappings = {
  'Electronics': 'electronics',
  'Baby Essentials': 'baby-essentials', 
  'Home Essentials': 'home-essentials',
  'Kitchen Accessories': 'kitchen-accessories',
  'Health & Beauty': 'health-beauty',
  'Gift': 'gift'
};

async function fixCategorySlugs() {
  console.log('🔍 Checking and fixing category slugs...\n');
  
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      const categoryName = data.name;
      
      // Skip if already has slug
      if (data.slug) {
        console.log(`✅ ${categoryName}: Already has slug '${data.slug}'`);
        skippedCount++;
        continue;
      }
      
      // Determine the correct slug
      const expectedSlug = categoryMappings[categoryName] || generateSlug(categoryName);
      
      console.log(`🔄 Updating ${categoryName} (${docSnapshot.id})`);
      console.log(`   Adding slug: ${expectedSlug}`);
      
      try {
        await updateDoc(doc(db, 'categories', docSnapshot.id), {
          slug: expectedSlug
        });
        console.log(`✅ Successfully updated ${categoryName}`);
        updatedCount++;
      } catch (error) {
        console.log(`❌ Failed to update ${categoryName}: ${error.message}`);
      }
      
      console.log('---');
    }
    
    console.log(`\n🎉 Update complete!`);
    console.log(`   Successfully updated: ${updatedCount} categories`);
    console.log(`   Already had slugs: ${skippedCount} categories`);
    
  } catch (error) {
    console.error('❌ Error fixing category slugs:', error);
  }
}

// Run the fix
if (require.main === module) {
  fixCategorySlugs()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Fix failed:', error);
      process.exit(1);
    });
}