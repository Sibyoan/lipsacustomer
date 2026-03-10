/**
 * Script to fix products with missing categorySlug fields
 * This script will:
 * 1. Find all products without categorySlug
 * 2. Generate categorySlug from categoryName or categoryId
 * 3. Update the products in Firestore
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

// Generate URL-friendly slug from category name
function generateCategorySlug(categoryName) {
  if (!categoryName) return '';
  
  return categoryName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Category name to slug mapping for common categories
const categoryMappings = {
  'Kitchen Accessories': 'kitchen-accessories',
  'Home Essentials': 'home-essentials',
  'Electronics': 'electronics',
  'Baby Essentials': 'baby-essentials',
  'Baby': 'baby-essentials', // Fix inconsistent naming
  'kitchen-accessories': 'kitchen-accessories', // Already correct
  'home-essentials': 'home-essentials', // Already correct
  'electronics': 'electronics', // Already correct
  'baby-essentials': 'baby-essentials', // Already correct
  'baby': 'baby-essentials' // Fix inconsistent naming
};

async function fixProductCategorySlugs() {
  try {
    console.log('🔍 Checking products for missing categorySlug fields...');
    
    // Get all products
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    let totalProducts = 0;
    let productsNeedingUpdate = 0;
    let updatedProducts = 0;
    
    const updates = [];
    
    querySnapshot.forEach((docSnapshot) => {
      totalProducts++;
      const product = docSnapshot.data();
      const productId = docSnapshot.id;
      
      // Check if categorySlug is missing or empty
      if (!product.categorySlug || product.categorySlug.trim() === '') {
        productsNeedingUpdate++;
        
        let newCategorySlug = '';
        
        // Try to get slug from categoryName first
        if (product.categoryName) {
          newCategorySlug = categoryMappings[product.categoryName] || generateCategorySlug(product.categoryName);
        }
        // Fallback to categoryId if no categoryName
        else if (product.categoryId) {
          newCategorySlug = categoryMappings[product.categoryId] || generateCategorySlug(product.categoryId);
        }
        // Fallback to category field
        else if (product.category) {
          newCategorySlug = categoryMappings[product.category] || generateCategorySlug(product.category);
        }
        
        if (newCategorySlug) {
          updates.push({
            id: productId,
            name: product.name || 'Unknown Product',
            currentCategoryName: product.categoryName || product.categoryId || product.category || 'Unknown',
            newCategorySlug: newCategorySlug
          });
        } else {
          console.warn(`⚠️  Could not generate categorySlug for product: ${product.name || productId}`);
        }
      }
    });
    
    console.log(`\n📊 Analysis Results:`);
    console.log(`   Total products: ${totalProducts}`);
    console.log(`   Products needing categorySlug: ${productsNeedingUpdate}`);
    console.log(`   Products ready for update: ${updates.length}`);
    
    if (updates.length === 0) {
      console.log('\n✅ All products already have categorySlug fields!');
      return;
    }
    
    console.log('\n📝 Products to be updated:');
    updates.forEach((update, index) => {
      console.log(`   ${index + 1}. ${update.name}`);
      console.log(`      Category: ${update.currentCategoryName} → Slug: ${update.newCategorySlug}`);
    });
    
    // Ask for confirmation (in a real script, you might want to add readline)
    console.log('\n🔄 Updating products...');
    
    // Update products in batches
    for (const update of updates) {
      try {
        const productRef = doc(db, 'products', update.id);
        await updateDoc(productRef, {
          categorySlug: update.newCategorySlug
        });
        updatedProducts++;
        console.log(`   ✅ Updated: ${update.name} → ${update.newCategorySlug}`);
      } catch (error) {
        console.error(`   ❌ Failed to update ${update.name}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Update complete!`);
    console.log(`   Successfully updated: ${updatedProducts}/${updates.length} products`);
    
    // Verify the updates
    console.log('\n🔍 Verifying updates...');
    await verifyUpdates();
    
  } catch (error) {
    console.error('❌ Error fixing product category slugs:', error);
  }
}

async function verifyUpdates() {
  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    let totalProducts = 0;
    let productsWithSlug = 0;
    const categorySlugs = new Set();
    
    querySnapshot.forEach((docSnapshot) => {
      totalProducts++;
      const product = docSnapshot.data();
      
      if (product.categorySlug && product.categorySlug.trim() !== '') {
        productsWithSlug++;
        categorySlugs.add(product.categorySlug);
      }
    });
    
    console.log(`   Total products: ${totalProducts}`);
    console.log(`   Products with categorySlug: ${productsWithSlug}`);
    console.log(`   Unique category slugs found: ${Array.from(categorySlugs).sort().join(', ')}`);
    
    if (productsWithSlug === totalProducts) {
      console.log('   ✅ All products now have categorySlug fields!');
    } else {
      console.log(`   ⚠️  ${totalProducts - productsWithSlug} products still missing categorySlug`);
    }
  } catch (error) {
    console.error('❌ Error verifying updates:', error);
  }
}

// Run the script
if (require.main === module) {
  fixProductCategorySlugs()
    .then(() => {
      console.log('\n✨ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fixProductCategorySlugs, generateCategorySlug };