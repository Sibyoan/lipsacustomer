// Test Category Filtering Script
// This script tests the category filtering system to ensure it works correctly

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs, orderBy, limit } = require('firebase/firestore');

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

// Test category slugs used by homepage sections
const testCategories = [
  'kitchen-accessories',
  'home-essentials', 
  'electronics',
  'baby-essentials'
];

async function testCategoryFiltering() {
  console.log('🧪 Testing Category Filtering System...\n');
  
  try {
    // Test each category slug
    for (const categorySlug of testCategories) {
      console.log(`📂 Testing category: ${categorySlug}`);
      
      // Query products by categorySlug (new method)
      const slugQuery = query(
        collection(db, 'products'),
        where('status', '==', 'approved'),
        where('categorySlug', '==', categorySlug),
        orderBy('createdAt', 'desc'),
        limit(12)
      );
      
      try {
        const slugSnapshot = await getDocs(slugQuery);
        const slugProducts = slugSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          categorySlug: doc.data().categorySlug,
          categoryName: doc.data().categoryName,
          categoryId: doc.data().categoryId
        }));
        
        console.log(`   ✅ Found ${slugProducts.length} products using categorySlug`);
        
        if (slugProducts.length > 0) {
          console.log(`   📋 Sample products:`);
          slugProducts.slice(0, 3).forEach((product, index) => {
            console.log(`      ${index + 1}. ${product.name}`);
            console.log(`         categorySlug: ${product.categorySlug}`);
            console.log(`         categoryName: ${product.categoryName}`);
          });
        }
        
      } catch (error) {
        console.log(`   ❌ Error querying by categorySlug: ${error.message}`);
        
        // Try fallback query by categoryId
        console.log(`   🔄 Trying fallback query by categoryId...`);
        
        const idQuery = query(
          collection(db, 'products'),
          where('status', '==', 'approved'),
          where('categoryId', '==', categorySlug),
          orderBy('createdAt', 'desc'),
          limit(12)
        );
        
        try {
          const idSnapshot = await getDocs(idQuery);
          console.log(`   ⚠️  Found ${idSnapshot.docs.length} products using categoryId fallback`);
        } catch (fallbackError) {
          console.log(`   ❌ Fallback query also failed: ${fallbackError.message}`);
        }
      }
      
      console.log('');
    }
    
    // Test best selling products
    console.log('🏆 Testing Best Selling Products...');
    
    const bestSellingQuery = query(
      collection(db, 'products'),
      where('status', '==', 'approved'),
      where('bestSelling', '==', true),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    try {
      const bestSellingSnapshot = await getDocs(bestSellingQuery);
      const bestSellingProducts = bestSellingSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        bestSelling: doc.data().bestSelling
      }));
      
      console.log(`   ✅ Found ${bestSellingProducts.length} best selling products`);
      
      if (bestSellingProducts.length > 0) {
        console.log(`   📋 Sample best selling products:`);
        bestSellingProducts.slice(0, 3).forEach((product, index) => {
          console.log(`      ${index + 1}. ${product.name}`);
        });
      }
      
    } catch (error) {
      console.log(`   ❌ Error querying best selling products: ${error.message}`);
    }
    
    console.log('\n📊 Summary:');
    console.log('   - Test completed for all homepage sections');
    console.log('   - Check results above for any issues');
    console.log('   - If products are found, the filtering system is working');
    console.log('   - If no products found, run fix-category-slugs.js script');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testCategoryFiltering().then(() => {
  console.log('\n🏁 Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});