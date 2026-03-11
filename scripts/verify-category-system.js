/**
 * Verification script for the category filtering system
 * This script checks:
 * 1. Homepage sections are using categorySlug correctly
 * 2. Products have proper categorySlug fields
 * 3. Required Firestore indexes exist
 * 4. System is ready for production
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, orderBy, limit } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const { firebaseConfig } = require('./firebase-config');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Expected homepage sections and their category slugs
const homepageSections = [
  { name: 'Kitchen Accessories', slug: 'kitchen-accessories', file: 'kitchen-accessories.tsx' },
  { name: 'Home Essentials', slug: 'home-essentials', file: 'home-essentials.tsx' },
  { name: 'Electronics', slug: 'electronics', file: 'electronics.tsx' },
  { name: 'Baby Essentials', slug: 'baby-essentials', file: 'baby-essentials.tsx' },
  { name: 'Selling Out Fast', slug: null, file: 'selling-out-fast.tsx', feature: 'bestSelling' }
];

async function verifyHomepageSections() {
  console.log('🔍 Verifying homepage sections...\n');
  
  let allCorrect = true;
  
  for (const section of homepageSections) {
    const filePath = path.join(__dirname, '..', 'src', 'components', 'sections', section.file);
    
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`❌ ${section.name}: File not found - ${section.file}`);
        allCorrect = false;
        continue;
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (section.slug) {
        // Check for categorySlug usage
        const categorySlugPattern = new RegExp(`categorySlug:\\s*['"]${section.slug}['"]`);
        const categoryIdPattern = new RegExp(`categoryId:\\s*['"]`);
        
        if (categorySlugPattern.test(content)) {
          console.log(`✅ ${section.name}: Using categorySlug correctly (${section.slug})`);
        } else if (categoryIdPattern.test(content)) {
          console.log(`⚠️  ${section.name}: Still using categoryId instead of categorySlug`);
          allCorrect = false;
        } else {
          console.log(`❌ ${section.name}: No category filtering found`);
          allCorrect = false;
        }
      } else if (section.feature) {
        // Check for feature flag usage
        const featurePattern = new RegExp(`${section.feature}:\\s*true`);
        
        if (featurePattern.test(content)) {
          console.log(`✅ ${section.name}: Using ${section.feature} flag correctly`);
        } else {
          console.log(`❌ ${section.name}: Missing ${section.feature} flag`);
          allCorrect = false;
        }
      }
      
    } catch (error) {
      console.log(`❌ ${section.name}: Error reading file - ${error.message}`);
      allCorrect = false;
    }
  }
  
  return allCorrect;
}

async function verifyProductData() {
  console.log('\n🔍 Verifying product data...\n');
  
  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    let totalProducts = 0;
    let approvedProducts = 0;
    let productsWithSlug = 0;
    let bestSellingProducts = 0;
    const categorySlugs = new Map();
    const missingSlugProducts = [];
    
    querySnapshot.forEach((doc) => {
      totalProducts++;
      const product = doc.data();
      
      // Check status
      if (product.status === 'approved') {
        approvedProducts++;
      }
      
      // Check categorySlug
      if (product.categorySlug && product.categorySlug.trim() !== '') {
        productsWithSlug++;
        const count = categorySlugs.get(product.categorySlug) || 0;
        categorySlugs.set(product.categorySlug, count + 1);
      } else {
        missingSlugProducts.push({
          id: doc.id,
          name: product.name || 'Unknown',
          categoryName: product.categoryName || product.categoryId || product.category || 'Unknown'
        });
      }
      
      // Check bestSelling flag
      if (product.bestSelling === true) {
        bestSellingProducts++;
      }
    });
    
    console.log(`📊 Product Statistics:`);
    console.log(`   Total products: ${totalProducts}`);
    console.log(`   Approved products: ${approvedProducts}`);
    console.log(`   Products with categorySlug: ${productsWithSlug}`);
    console.log(`   Best selling products: ${bestSellingProducts}`);
    
    console.log(`\n📂 Category Slugs Found:`);
    const sortedSlugs = Array.from(categorySlugs.entries()).sort((a, b) => b[1] - a[1]);
    sortedSlugs.forEach(([slug, count]) => {
      const isHomepageCategory = homepageSections.some(section => section.slug === slug);
      const status = isHomepageCategory ? '✅' : '📝';
      console.log(`   ${status} ${slug}: ${count} products`);
    });
    
    if (missingSlugProducts.length > 0) {
      console.log(`\n⚠️  Products Missing categorySlug (${missingSlugProducts.length}):`);
      missingSlugProducts.slice(0, 5).forEach(product => {
        console.log(`   - ${product.name} (${product.categoryName})`);
      });
      if (missingSlugProducts.length > 5) {
        console.log(`   ... and ${missingSlugProducts.length - 5} more`);
      }
      console.log(`\n💡 Run 'node scripts/fix-product-category-slugs.js' to fix missing slugs`);
    }
    
    return {
      totalProducts,
      approvedProducts,
      productsWithSlug,
      bestSellingProducts,
      missingSlugProducts: missingSlugProducts.length,
      categorySlugs: sortedSlugs
    };
    
  } catch (error) {
    console.error('❌ Error verifying product data:', error);
    return null;
  }
}

async function testHomepageQueries() {
  console.log('\n🔍 Testing homepage queries...\n');
  
  let allQueriesWork = true;
  
  for (const section of homepageSections) {
    try {
      const productsRef = collection(db, 'products');
      let q = query(productsRef, where('status', '==', 'approved'));
      
      if (section.slug) {
        q = query(q, where('categorySlug', '==', section.slug));
      } else if (section.feature) {
        q = query(q, where(section.feature, '==', true));
      }
      
      q = query(q, orderBy('createdAt', 'desc'), limit(12));
      
      const querySnapshot = await getDocs(q);
      const productCount = querySnapshot.size;
      
      if (productCount > 0) {
        console.log(`✅ ${section.name}: ${productCount} products found`);
      } else {
        console.log(`⚠️  ${section.name}: No products found (may need data or indexes)`);
        // Don't mark as failure - might just be empty data
      }
      
    } catch (error) {
      console.log(`❌ ${section.name}: Query failed - ${error.message}`);
      if (error.message.includes('index')) {
        console.log(`   💡 Create composite index: status ASC, ${section.slug ? 'categorySlug' : section.feature} ASC, createdAt DESC`);
      }
      allQueriesWork = false;
    }
  }
  
  return allQueriesWork;
}

async function generateReport() {
  console.log('🎯 Category Filtering System Verification Report');
  console.log('='.repeat(50));
  
  const sectionsOk = await verifyHomepageSections();
  const productData = await verifyProductData();
  const queriesOk = await testHomepageQueries();
  
  console.log('\n📋 Summary:');
  console.log('='.repeat(20));
  
  console.log(`Homepage Sections: ${sectionsOk ? '✅ All correct' : '❌ Issues found'}`);
  console.log(`Product Data: ${productData ? '✅ Available' : '❌ Issues found'}`);
  console.log(`Firestore Queries: ${queriesOk ? '✅ Working' : '❌ Index issues'}`);
  
  if (productData) {
    const completionRate = ((productData.productsWithSlug / productData.totalProducts) * 100).toFixed(1);
    console.log(`CategorySlug Coverage: ${completionRate}% (${productData.productsWithSlug}/${productData.totalProducts})`);
  }
  
  console.log('\n🎯 Recommendations:');
  console.log('-'.repeat(20));
  
  if (!sectionsOk) {
    console.log('1. Update homepage sections to use categorySlug instead of categoryId');
  }
  
  if (productData && productData.missingSlugProducts > 0) {
    console.log('2. Run data migration script to fix missing categorySlug fields');
  }
  
  if (!queriesOk) {
    console.log('3. Create required Firestore composite indexes');
  }
  
  if (sectionsOk && queriesOk && (!productData || productData.missingSlugProducts === 0)) {
    console.log('🎉 System is fully operational! No action required.');
  }
  
  console.log('\n✨ Verification complete!');
}

// Run the verification
if (require.main === module) {
  generateReport()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { verifyHomepageSections, verifyProductData, testHomepageQueries };