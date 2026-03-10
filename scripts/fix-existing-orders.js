/**
 * Script to fix existing orders with missing customerId or vendorId
 * This script will:
 * 1. Find orders with empty customerId or vendorId
 * 2. Attempt to fix them by fetching product data
 * 3. Update the orders with correct vendor information
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc, updateDoc, query, where } = require('firebase/firestore');

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

async function fixExistingOrders() {
  try {
    console.log('🔍 Checking existing orders for missing customerId/vendorId...');
    
    // Get all orders
    const ordersRef = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersRef);
    
    let totalOrders = 0;
    let ordersNeedingFix = 0;
    let fixedOrders = 0;
    
    const ordersToFix = [];
    
    for (const orderDoc of querySnapshot.docs) {
      totalOrders++;
      const order = orderDoc.data();
      const orderId = orderDoc.id;
      
      let needsFix = false;
      const issues = [];
      
      // Check for missing customerId
      if (!order.customerId || order.customerId.trim() === '') {
        needsFix = true;
        issues.push('missing customerId');
      }
      
      // Check for missing vendorId in products
      const productsWithoutVendor = (order.products || []).filter(p => !p.vendorId || p.vendorId.trim() === '');
      if (productsWithoutVendor.length > 0) {
        needsFix = true;
        issues.push(`${productsWithoutVendor.length} products missing vendorId`);
      }
      
      // Check for empty vendors array
      if (!order.vendors || order.vendors.length === 0) {
        needsFix = true;
        issues.push('empty vendors array');
      }
      
      if (needsFix) {
        ordersNeedingFix++;
        ordersToFix.push({
          id: orderId,
          order: order,
          issues: issues
        });
      }
    }
    
    console.log(`\n📊 Analysis Results:`);
    console.log(`   Total orders: ${totalOrders}`);
    console.log(`   Orders needing fix: ${ordersNeedingFix}`);
    
    if (ordersToFix.length === 0) {
      console.log('\n✅ All orders have proper customerId and vendorId!');
      return;
    }
    
    console.log('\n📝 Orders to be fixed:');
    ordersToFix.forEach((item, index) => {
      console.log(`   ${index + 1}. Order ${item.id}`);
      console.log(`      Issues: ${item.issues.join(', ')}`);
      console.log(`      Customer: ${item.order.customerName || 'Unknown'}`);
      console.log(`      Products: ${(item.order.products || []).length}`);
    });
    
    console.log('\n🔧 Fixing orders...');
    
    // Fix each order
    for (const item of ordersToFix) {
      try {
        const updates = {};
        let hasUpdates = false;
        
        // Fix products without vendorId by fetching from Firestore
        if (item.order.products && item.order.products.length > 0) {
          const fixedProducts = [];
          const vendorIds = new Set();
          
          for (const product of item.order.products) {
            let fixedProduct = { ...product };
            
            // If product is missing vendorId, try to fetch it
            if (!product.vendorId || product.vendorId.trim() === '') {
              try {
                const productDoc = await getDoc(doc(db, 'products', product.productId));
                if (productDoc.exists()) {
                  const productData = productDoc.data();
                  if (productData.vendorId) {
                    fixedProduct.vendorId = productData.vendorId;
                    console.log(`      ✅ Fixed vendorId for product ${product.name}: ${productData.vendorId}`);
                  } else {
                    console.log(`      ⚠️  Product ${product.name} has no vendorId in Firestore`);
                    fixedProduct.vendorId = 'unknown-vendor'; // Fallback
                  }
                } else {
                  console.log(`      ⚠️  Product ${product.productId} not found in Firestore`);
                  fixedProduct.vendorId = 'unknown-vendor'; // Fallback
                }
              } catch (error) {
                console.log(`      ❌ Error fetching product ${product.productId}:`, error.message);
                fixedProduct.vendorId = 'unknown-vendor'; // Fallback
              }
            }
            
            if (fixedProduct.vendorId && fixedProduct.vendorId !== 'unknown-vendor') {
              vendorIds.add(fixedProduct.vendorId);
            }
            
            fixedProducts.push(fixedProduct);
          }
          
          updates.products = fixedProducts;
          updates.vendors = Array.from(vendorIds);
          
          // Set primary vendorId for single-vendor orders
          if (vendorIds.size === 1) {
            updates.vendorId = Array.from(vendorIds)[0];
          }
          
          hasUpdates = true;
        }
        
        // Apply updates if any
        if (hasUpdates) {
          const orderRef = doc(db, 'orders', item.id);
          await updateDoc(orderRef, updates);
          fixedOrders++;
          console.log(`   ✅ Fixed order ${item.id}`);
        } else {
          console.log(`   ⚠️  No fixes applied to order ${item.id}`);
        }
        
      } catch (error) {
        console.error(`   ❌ Failed to fix order ${item.id}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Fix complete!`);
    console.log(`   Successfully fixed: ${fixedOrders}/${ordersToFix.length} orders`);
    
    // Verify the fixes
    console.log('\n🔍 Verifying fixes...');
    await verifyOrderFixes();
    
  } catch (error) {
    console.error('❌ Error fixing existing orders:', error);
  }
}

async function verifyOrderFixes() {
  try {
    const ordersRef = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersRef);
    
    let totalOrders = 0;
    let ordersWithCustomerId = 0;
    let ordersWithVendors = 0;
    let ordersWithProductVendors = 0;
    
    querySnapshot.forEach((doc) => {
      totalOrders++;
      const order = doc.data();
      
      if (order.customerId && order.customerId.trim() !== '') {
        ordersWithCustomerId++;
      }
      
      if (order.vendors && order.vendors.length > 0) {
        ordersWithVendors++;
      }
      
      const productsWithVendor = (order.products || []).filter(p => p.vendorId && p.vendorId.trim() !== '');
      if (productsWithVendor.length === (order.products || []).length) {
        ordersWithProductVendors++;
      }
    });
    
    console.log(`   Total orders: ${totalOrders}`);
    console.log(`   Orders with customerId: ${ordersWithCustomerId}`);
    console.log(`   Orders with vendors array: ${ordersWithVendors}`);
    console.log(`   Orders with all product vendorIds: ${ordersWithProductVendors}`);
    
    if (ordersWithCustomerId === totalOrders && ordersWithVendors === totalOrders && ordersWithProductVendors === totalOrders) {
      console.log('   ✅ All orders now have proper customerId and vendorId!');
    } else {
      console.log(`   ⚠️  Some orders still have issues`);
    }
  } catch (error) {
    console.error('❌ Error verifying fixes:', error);
  }
}

// Run the script
if (require.main === module) {
  fixExistingOrders()
    .then(() => {
      console.log('\n✨ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fixExistingOrders };