/**
 * Script to fix the remaining 3 products and add bestSelling flags
 * This script provides the exact Firestore update commands needed
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc, query, where } = require('firebase/firestore');

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

async function analyzeAndFixProducts() {
  try {
    console.log('🔍 Analyzing products that need fixes...\n');
    
    // Get all products
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    const productsNeedingFix = [];
    const allProducts = [];
    
    querySnapshot.forEach((docSnapshot) => {
      const product = docSnapshot.data();
      const productData = {
        id: docSnapshot.id,
        name: product.name || 'Unknown Product',
        categorySlug: product.categorySlug,
        categoryName: product.categoryName,
        categoryId: product.categoryId,
        category: product.category,
        bestSelling: product.bestSelling,
        status: product.status
      };
      
      allProducts.push(productData);
      
      // Check if categorySlug is missing
      if (!product.categorySlug || product.categorySlug.trim() === '') {
        productsNeedingFix.push(productData);
      }
    });
    
    console.log(`📊 Analysis Results:`);
    console.log(`   Total products: ${allProducts.length}`);
    console.log(`   Products needing categorySlug fix: ${productsNeedingFix.length}`);
    console.log(`   Products with bestSelling flag: ${allProducts.filter(p => p.bestSelling).length}`);
    
    if (productsNeedingFix.length > 0) {
      console.log(`\n🔧 Products needing categorySlug fix:`);
      productsNeedingFix.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} (ID: ${product.id})`);
        console.log(`      Current categoryName: ${product.categoryName || 'None'}`);
        console.log(`      Current categoryId: ${product.categoryId || 'None'}`);
        console.log(`      Current category: ${product.category || 'None'}`);
        
        // Suggest categorySlug based on available data
        let suggestedSlug = '';
        if (product.categoryName) {
          if (product.categoryName.toLowerCase().includes('kitchen')) {
            suggestedSlug = 'kitchen-accessories';
          } else if (product.categoryName.toLowerCase().includes('home')) {
            suggestedSlug = 'home-essentials';
          } else if (product.categoryName.toLowerCase().includes('electronic')) {
            suggestedSlug = 'electronics';
          } else if (product.categoryName.toLowerCase().includes('baby')) {
            suggestedSlug = 'baby-essentials';
          }
        } else if (product.category) {
          if (product.category.toLowerCase().includes('kitchen')) {
            suggestedSlug = 'kitchen-accessories';
          } else if (product.category.toLowerCase().includes('home')) {
            suggestedSlug = 'home-essentials';
          } else if (product.category.toLowerCase().includes('electronic')) {
            suggestedSlug = 'electronics';
          } else if (product.category.toLowerCase().includes('baby')) {
            suggestedSlug = 'baby-essentials';
          }
        }
        
        // Default to electronics if we can't determine
        if (!suggestedSlug) {
          suggestedSlug = 'electronics';
        }
        
        console.log(`      Suggested categorySlug: ${suggestedSlug}`);
        console.log('');
      });
      
      console.log(`\n📝 Manual Fix Commands (run in Firebase Console):`);
      console.log(`   Go to: https://console.firebase.google.com/project/lipsa-aec23/firestore/data`);
      console.log(`   Navigate to: products collection`);
      console.log(`   For each product, add the categorySlug field:\n`);
      
      productsNeedingFix.forEach((product, index) => {
        let suggestedSlug = 'electronics'; // default
        if (product.categoryName) {
          if (product.categoryName.toLowerCase().includes('kitchen')) {
            suggestedSlug = 'kitchen-accessories';
          } else if (product.categoryName.toLowerCase().includes('home')) {
            suggestedSlug = 'home-essentials';
          } else if (product.categoryName.toLowerCase().includes('electronic')) {
            suggestedSlug = 'electronics';
          } else if (product.categoryName.toLowerCase().includes('baby')) {
            suggestedSlug = 'baby-essentials';
          }
        }
        
        console.log(`   ${index + 1}. Product ID: ${product.id} (${product.name})`);
        console.log(`      Add field: categorySlug = "${suggestedSlug}"`);
        console.log('');
      });
    }
    
    // Suggest some products for bestSelling flag
    console.log(`\n⭐ Suggested products for bestSelling flag:`);
    const approvedProducts = allProducts.filter(p => p.status === 'approved');
    const randomProducts = approvedProducts.slice(0, 5);
    
    randomProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. Product ID: ${product.id} (${product.name})`);
      console.log(`      Add field: bestSelling = true`);
      console.log('');
    });
    
    console.log(`\n✅ After making these changes:`);
    console.log(`   1. All products will have categorySlug fields`);
    console.log(`   2. Category pages will show products correctly`);
    console.log(`   3. "Selling Out Fast" section will have products`);
    console.log(`   4. Run verification script to confirm: node scripts/verify-category-system.js`);
    
  } catch (error) {
    console.error('❌ Error analyzing products:', error);
  }
}

// Run the analysis
if (require.main === module) {
  analyzeAndFixProducts()
    .then(() => {
      console.log('\n✨ Analysis complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = { analyzeAndFixProducts };