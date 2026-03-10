/**
 * Quick verification script to check if orders have proper customerId and vendorId
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy, limit } = require('firebase/firestore');

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

async function quickVerification() {
  console.log('🔍 Quick Order Fields Verification\n');
  
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(5));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('📝 No orders found in database');
      console.log('✨ System is ready - create a test order to verify functionality');
      return;
    }
    
    console.log(`📊 Checking ${querySnapshot.size} most recent orders:\n`);
    
    let validOrders = 0;
    
    querySnapshot.forEach((doc, index) => {
      const order = doc.data();
      const orderId = doc.id.substring(0, 8) + '...';
      
      const hasCustomerId = order.customerId && order.customerId.trim() !== '';
      const hasVendorId = order.vendorId && order.vendorId.trim() !== '';
      const hasVendorsArray = order.vendors && Array.isArray(order.vendors) && order.vendors.length > 0;
      const hasProducts = order.products && Array.isArray(order.products) && order.products.length > 0;
      
      let productsWithVendorId = 0;
      if (hasProducts) {
        productsWithVendorId = order.products.filter(p => p.vendorId && p.vendorId.trim() !== '').length;
      }
      
      const isValid = hasCustomerId && (hasVendorId || hasVendorsArray) && hasProducts && productsWithVendorId === order.products.length;
      
      if (isValid) validOrders++;
      
      console.log(`${index + 1}. Order ${orderId} ${isValid ? '✅' : '❌'}`);
      console.log(`   customerId: ${hasCustomerId ? '✅' : '❌'} ${hasCustomerId ? order.customerId.substring(0, 8) + '...' : 'MISSING'}`);
      console.log(`   vendorId: ${hasVendorId ? '✅' : '❌'} ${hasVendorId ? order.vendorId.substring(0, 8) + '...' : 'MISSING'}`);
      console.log(`   vendors: ${hasVendorsArray ? '✅' : '❌'} ${hasVendorsArray ? `[${order.vendors.length} vendors]` : 'MISSING'}`);
      console.log(`   products: ${hasProducts ? '✅' : '❌'} ${hasProducts ? `${order.products.length} items` : 'MISSING'}`);
      if (hasProducts) {
        console.log(`   products with vendorId: ${productsWithVendorId}/${order.products.length}`);
      }
      console.log(`   total: ₹${order.totalPrice || order.totalAmount || 'MISSING'}`);
      console.log(`   status: ${order.status || order.orderStatus || 'MISSING'}`);
      console.log('');
    });
    
    const successRate = ((validOrders / querySnapshot.size) * 100).toFixed(1);
    
    console.log('📊 Summary:');
    console.log(`   Valid orders: ${validOrders}/${querySnapshot.size} (${successRate}%)`);
    
    if (validOrders === querySnapshot.size) {
      console.log('   🎉 All orders have proper customerId and vendorId!');
      console.log('   ✅ Order creation system is working correctly');
    } else {
      console.log('   ⚠️  Some orders have missing fields');
      console.log('   💡 This might indicate issues with older orders or test data');
      console.log('   🔧 New orders should have all required fields');
    }
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
  }
}

// Run verification
if (require.main === module) {
  quickVerification()
    .then(() => {
      console.log('\n✨ Verification completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { quickVerification };