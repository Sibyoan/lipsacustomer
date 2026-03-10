/**
 * Test script for order creation logic
 * This script tests the order creation flow to ensure customerId and vendorId are properly stored
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc, query, where, orderBy, limit } = require('firebase/firestore');

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

async function testOrderCreation() {
  console.log('🧪 Testing Order Creation Logic...\n');
  
  try {
    // Test 1: Check recent orders structure
    console.log('📋 Test 1: Checking recent orders structure...');
    
    const ordersRef = collection(db, 'orders');
    const recentOrdersQuery = query(ordersRef, orderBy('createdAt', 'desc'), limit(5));
    const recentOrders = await getDocs(recentOrdersQuery);
    
    if (recentOrders.empty) {
      console.log('   ⚠️  No orders found in database');
    } else {
      console.log(`   📊 Found ${recentOrders.size} recent orders`);
      
      let ordersWithCustomerId = 0;
      let ordersWithVendors = 0;
      let ordersWithProductVendors = 0;
      
      recentOrders.forEach((doc, index) => {
        const order = doc.data();
        console.log(`\n   Order ${index + 1} (${doc.id}):`);
        
        // Check customerId
        if (order.customerId && order.customerId.trim() !== '') {
          console.log(`      ✅ customerId: ${order.customerId}`);
          ordersWithCustomerId++;
        } else {
          console.log(`      ❌ customerId: MISSING or EMPTY`);
        }
        
        // Check vendors array
        if (order.vendors && order.vendors.length > 0) {
          console.log(`      ✅ vendors: [${order.vendors.join(', ')}]`);
          ordersWithVendors++;
        } else {
          console.log(`      ❌ vendors: MISSING or EMPTY`);
        }
        
        // Check vendorId (optional for multi-vendor)
        if (order.vendorId) {
          console.log(`      ✅ vendorId: ${order.vendorId}`);
        }
        
        // Check products vendorId
        const products = order.products || [];
        const productsWithVendor = products.filter(p => p.vendorId && p.vendorId.trim() !== '');
        
        if (productsWithVendor.length === products.length && products.length > 0) {
          console.log(`      ✅ products: All ${products.length} products have vendorId`);
          ordersWithProductVendors++;
        } else {
          console.log(`      ❌ products: ${productsWithVendor.length}/${products.length} products have vendorId`);
        }
        
        // Show customer info
        console.log(`      👤 customer: ${order.customerName || 'Unknown'} (${order.customerEmail || 'No email'})`);
        console.log(`      💰 total: ₹${order.totalAmount || order.totalPrice || 0}`);
        console.log(`      📅 created: ${order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}`);
      });
      
      console.log(`\n   📊 Summary:`);
      console.log(`      Orders with customerId: ${ordersWithCustomerId}/${recentOrders.size}`);
      console.log(`      Orders with vendors: ${ordersWithVendors}/${recentOrders.size}`);
      console.log(`      Orders with product vendorIds: ${ordersWithProductVendors}/${recentOrders.size}`);
    }
    
    // Test 2: Check products have vendorId
    console.log('\n📋 Test 2: Checking products have vendorId...');
    
    const productsRef = collection(db, 'products');
    const productsQuery = query(productsRef, where('status', '==', 'approved'), limit(10));
    const products = await getDocs(productsQuery);
    
    if (products.empty) {
      console.log('   ⚠️  No approved products found');
    } else {
      console.log(`   📊 Checking ${products.size} approved products`);
      
      let productsWithVendor = 0;
      
      products.forEach((doc, index) => {
        const product = doc.data();
        if (product.vendorId && product.vendorId.trim() !== '') {
          productsWithVendor++;
        } else {
          console.log(`   ⚠️  Product "${product.name}" missing vendorId`);
        }
      });
      
      console.log(`   ✅ Products with vendorId: ${productsWithVendor}/${products.size}`);
    }
    
    // Test 3: Check cart structure (sample)
    console.log('\n📋 Test 3: Checking cart structure...');
    
    const cartsRef = collection(db, 'carts');
    const cartsQuery = query(cartsRef, limit(3));
    const carts = await getDocs(cartsQuery);
    
    if (carts.empty) {
      console.log('   ⚠️  No carts found');
    } else {
      console.log(`   📊 Checking ${carts.size} cart documents`);
      
      carts.forEach((doc, index) => {
        const cart = doc.data();
        const products = cart.products || [];
        
        console.log(`   Cart ${index + 1} (${doc.id}):`);
        console.log(`      Products: ${products.length}`);
        
        products.forEach((product, pIndex) => {
          if (product.vendorId) {
            console.log(`      ✅ Product ${pIndex + 1}: Has vendorId (${product.vendorId})`);
          } else {
            console.log(`      ❌ Product ${pIndex + 1}: Missing vendorId`);
          }
        });
      });
    }
    
    // Test 4: Overall system health
    console.log('\n📋 Test 4: Overall system health check...');
    
    // Count total orders
    const allOrdersQuery = await getDocs(collection(db, 'orders'));
    const totalOrders = allOrdersQuery.size;
    
    // Count orders with proper structure
    let healthyOrders = 0;
    allOrdersQuery.forEach((doc) => {
      const order = doc.data();
      const hasCustomerId = order.customerId && order.customerId.trim() !== '';
      const hasVendors = order.vendors && order.vendors.length > 0;
      const products = order.products || [];
      const allProductsHaveVendor = products.length > 0 && products.every(p => p.vendorId && p.vendorId.trim() !== '');
      
      if (hasCustomerId && hasVendors && allProductsHaveVendor) {
        healthyOrders++;
      }
    });
    
    const healthPercentage = totalOrders > 0 ? ((healthyOrders / totalOrders) * 100).toFixed(1) : 0;
    
    console.log(`   📊 System Health:`);
    console.log(`      Total orders: ${totalOrders}`);
    console.log(`      Healthy orders: ${healthyOrders}`);
    console.log(`      Health percentage: ${healthPercentage}%`);
    
    if (healthPercentage >= 90) {
      console.log(`   ✅ System is healthy!`);
    } else if (healthPercentage >= 70) {
      console.log(`   ⚠️  System needs attention`);
    } else {
      console.log(`   ❌ System needs immediate fixes`);
    }
    
    console.log('\n🎯 Recommendations:');
    console.log('-'.repeat(20));
    
    if (healthPercentage < 100) {
      console.log('1. Run fix-existing-orders.js script to fix old orders');
    }
    
    if (productsWithVendor < products.size) {
      console.log('2. Ensure all products have vendorId field');
    }
    
    console.log('3. Test order creation flow manually');
    console.log('4. Verify admin and vendor dashboards work correctly');
    
    if (healthPercentage >= 90) {
      console.log('\n🎉 Order creation system is working correctly!');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
if (require.main === module) {
  testOrderCreation()
    .then(() => {
      console.log('\n✨ Test completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testOrderCreation };