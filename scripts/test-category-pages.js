/**
 * Test script to verify category pages are working
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, orderBy, limit } = require('firebase/firestore');

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

const categoryRoutes = [
  { slug: 'home-essentials', name: 'Home Essentials' },
  { slug: 'kitchen-accessories', name: 'Kitchen Accessories' },
  { slug: 'electronics', name: 'Electronics' },
  { slug: 'baby-essentials', name: 'Baby Essentials' }
];

async function testCategoryPages() {
  console.log('🧪 Testing Category Pages');
  console.log('='.repeat(40));
  
  for (const category of categoryRoutes) {
    try {
      console.log(`\n📂 Testing /category/${category.slug}`);
      
      // Test the query that the category page will use
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        where('status', '==', 'approved'),
        where('categorySlug', '==', category.slug),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        categorySlug: doc.data().categorySlug,
        status: doc.data().status
      }));
      
      console.log(`   ✅ Query successful: ${products.length} products found`);
      
      if (products.length > 0) {
        console.log(`   📦 Sample products:`);
        products.slice(0, 3).forEach((product, index) => {
          console.log(`      ${index + 1}. ${product.name}`);
        });
      } else {
        console.log(`   ⚠️  No products found - page will show "No Products Yet"`);
      }
      
    } catch (error) {
      console.log(`   ❌ Query failed: ${error.message}`);
      if (error.message.includes('index')) {
        console.log(`   💡 Missing Firestore index - create composite index for: status, categorySlug, createdAt`);
      }
    }
  }
  
  console.log(`\n🎯 Summary:`);
  console.log(`   Category pages are implemented at: /category/[slug]`);
  console.log(`   Collection pages are implemented at: /collections/[slug]`);
  console.log(`   Both use the same categorySlug filtering logic`);
  console.log(`   Products with missing categorySlug will not appear`);
  
  console.log(`\n🔗 Test URLs (after starting dev server):`);
  categoryRoutes.forEach(category => {
    console.log(`   http://localhost:3000/category/${category.slug}`);
  });
  
  console.log(`\n✨ Test complete!`);
}

// Run the test
if (require.main === module) {
  testCategoryPages()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testCategoryPages };