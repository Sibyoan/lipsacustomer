/**
 * Script to fix orders that have incorrect totalPrice/totalAmount values
 * This fixes orders where the price was accidentally set to the payment method string
 */

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function fixOrderPrices() {
  try {
    console.log('Starting to fix order prices...\n');

    // Get all orders
    const ordersSnapshot = await db.collection('orders').get();
    
    if (ordersSnapshot.empty) {
      console.log('No orders found.');
      return;
    }

    let fixedCount = 0;
    let skippedCount = 0;

    for (const doc of ordersSnapshot.docs) {
      const order = doc.data();
      const orderId = doc.id;

      // Check if totalPrice or totalAmount is invalid (string or missing)
      const totalPrice = order.totalPrice;
      const totalAmount = order.totalAmount;
      
      const needsFix = (
        typeof totalPrice === 'string' || 
        typeof totalAmount === 'string' ||
        !totalPrice ||
        !totalAmount ||
        totalPrice === 0 ||
        totalAmount === 0
      );

      if (needsFix && order.products && Array.isArray(order.products)) {
        // Calculate correct total from products
        const correctTotal = order.products.reduce((sum, product) => {
          return sum + (product.price * product.quantity);
        }, 0);

        console.log(`Order ${orderId.slice(0, 8)}:`);
        console.log(`  Current totalPrice: ${totalPrice}`);
        console.log(`  Current totalAmount: ${totalAmount}`);
        console.log(`  Calculated total: ₹${correctTotal}`);

        // Update the order
        await db.collection('orders').doc(orderId).update({
          totalPrice: correctTotal,
          totalAmount: correctTotal
        });

        console.log(`  ✓ Fixed!\n`);
        fixedCount++;
      } else {
        console.log(`Order ${orderId.slice(0, 8)}: Already correct (₹${totalPrice || totalAmount})`);
        skippedCount++;
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Fixed: ${fixedCount} orders`);
    console.log(`Skipped: ${skippedCount} orders (already correct)`);
    console.log(`Total: ${ordersSnapshot.size} orders`);

  } catch (error) {
    console.error('Error fixing order prices:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
fixOrderPrices();
