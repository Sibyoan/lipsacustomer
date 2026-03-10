/**
 * Test script to verify Electronics category products can be found
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

async function testElectronicsQuery() {
  console.log('🔍 Testing Electronics category queries...\n');
  
  const electronicsId = 'eBnrnUZ2Q54BvNKi8kkW';
  const electronicsSlug = 'electronics';
  
  try {
    // Test 1: Query by categorySlug
    console.log('📱 Test 1: Query by categorySlug = "electronics"');
    const productsRef1 = collection(db, 'products');
    const q1 = query(
      productsRef1,
      where('status', '==', 'approved'),
      where('categorySlug', '==', electronicsSlug),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const snapshot1 = await getDocs(q1);
    console.log(`   Found ${snapshot1.size} products`);
    snapshot1.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${data.name} (categorySlug: ${data.categorySlug})`);
    });
    
    // Test 2: Query by categoryId
    console.log('\n📱 Test 2: Query by categoryId = "eBnrnUZ2Q54BvNKi8kkW"');
    const productsRef2 = collection(db, 'products');
    const q2 = query(
      productsRef2,
      where('status', '==', 'approved'),
      where('categoryId', '==', electronicsId),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const snapshot2 = await getDocs(q2);
    console.log(`   Found ${snapshot2.size} products`);
    snapshot2.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${data.name} (categoryId: ${data.categoryId})`);
    });
    
    // Test 3: Query by category field (legacy)
    console.log('\n📱 Test 3: Query by category = "eBnrnUZ2Q54BvNKi8kkW"');
    const productsRef3 = collection(db, 'products');
    const q3 = query(
      productsRef3,
      where('status', '==', 'approved'),
      where('category', '==', electronicsId),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const snapshot3 = await getDocs(q3);
    console.log(`   Found ${snapshot3.size} products`);
    snapshot3.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${data.name} (category: ${data.category})`);
    });
    
    console.log('\n✅ Query tests completed!');
    
  } catch (error) {
    console.error('❌ Error testing queries:', error);
  }
}

// Run the test
if (require.main === module) {
  testElectronicsQuery()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Test failed:', error);
      process.exit(1);
    });
}