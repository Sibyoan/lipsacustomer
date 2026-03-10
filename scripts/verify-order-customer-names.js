const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy, limit, doc, getDoc } = require('firebase/firestore');

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  // Add your Firebase config here
  // This script is for verification purposes
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function verifyOrderCustomerNames() {
  console.log('🔍 Verifying Order Customer Names...\n');

  try {
    // Get recent orders
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(10));
    const ordersSnapshot = await getDocs(q);

    if (ordersSnapshot.empty) {
      console.log('❌ No orders found in the database');
      return;
    }

    console.log(`📊 Found ${ordersSnapshot.size} recent orders\n`);

    let correctNames = 0;
    let hardcodedNames = 0;
    let missingNames = 0;

    for (const orderDoc of ordersSnapshot.docs) {
      const orderData = orderDoc.data();
      const orderId = orderDoc.id;
      
      console.log(`📋 Order ID: ${orderId.slice(0, 8)}...`);
      console.log(`   Customer ID: ${orderData.customerId?.slice(0, 8)}...`);
      console.log(`   Customer Name: "${orderData.customerName}"`);
      console.log(`   Customer Email: ${orderData.customerEmail}`);
      
      // Check if customer name is hardcoded
      if (orderData.customerName === 'Customer') {
        console.log('   ❌ ISSUE: Hardcoded customer name detected');
        hardcodedNames++;
        
        // Try to fetch the real customer name from users collection
        if (orderData.customerId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', orderData.customerId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log(`   💡 Real customer name should be: "${userData.name}"`);
            } else {
              console.log('   ⚠️  User document not found in users collection');
            }
          } catch (error) {
            console.log('   ⚠️  Error fetching user data:', error.message);
          }
        }
      } else if (!orderData.customerName) {
        console.log('   ❌ ISSUE: Missing customer name');
        missingNames++;
      } else {
        console.log('   ✅ Customer name looks correct');
        correctNames++;
      }
      
      console.log('   ---');
    }

    console.log('\n📈 SUMMARY:');
    console.log(`✅ Orders with correct names: ${correctNames}`);
    console.log(`❌ Orders with hardcoded "Customer": ${hardcodedNames}`);
    console.log(`❌ Orders with missing names: ${missingNames}`);
    
    if (hardcodedNames > 0 || missingNames > 0) {
      console.log('\n🔧 RECOMMENDATION:');
      console.log('The order creation logic needs to be updated to fetch the real customer name from the users collection.');
      console.log('This has been fixed in the useOrders.ts file.');
    } else {
      console.log('\n✅ All orders have proper customer names!');
    }

  } catch (error) {
    console.error('❌ Error verifying orders:', error);
  }
}

async function checkUserDocuments() {
  console.log('\n👥 Checking User Documents...\n');

  try {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);

    if (usersSnapshot.empty) {
      console.log('❌ No users found in the database');
      return;
    }

    console.log(`📊 Found ${usersSnapshot.size} users\n`);

    let usersWithNames = 0;
    let usersWithoutNames = 0;

    usersSnapshot.docs.forEach(userDoc => {
      const userData = userDoc.data();
      const userId = userDoc.id;
      
      console.log(`👤 User ID: ${userId.slice(0, 8)}...`);
      console.log(`   Name: "${userData.name || 'NOT SET'}"`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Role: ${userData.role}`);
      
      if (userData.name && userData.name.trim() !== '') {
        console.log('   ✅ Has proper name');
        usersWithNames++;
      } else {
        console.log('   ❌ Missing or empty name');
        usersWithoutNames++;
      }
      
      console.log('   ---');
    });

    console.log('\n📈 USER SUMMARY:');
    console.log(`✅ Users with names: ${usersWithNames}`);
    console.log(`❌ Users without names: ${usersWithoutNames}`);

  } catch (error) {
    console.error('❌ Error checking users:', error);
  }
}

// Run the verification
async function main() {
  console.log('🚀 Starting Order Customer Name Verification\n');
  
  await verifyOrderCustomerNames();
  await checkUserDocuments();
  
  console.log('\n✅ Verification complete!');
  process.exit(0);
}

main().catch(console.error);