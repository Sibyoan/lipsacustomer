/**
 * Script to fix orders that have incorrect totalPrice/totalAmount values
 * Run this with: node scripts/fix-order-totals.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function fixOrderTotals() {
  try {
    console.log('Fetching all orders...');
    const ordersSnapshot = await db.collection('orders').get();
    
    let fixedCount = 0;
    let skippedCount = 0;
    
    for (const doc of ordersSnapshot.docs) {
      const order = doc.data();
      const orderId = doc.id;
      
      // Check if totalPrice or totalAmount is invalid (not a number or is 'COD')
      const totalPriceInvalid = typeof order.totalPrice !== 'number' || isNaN(order.totalPrice);
      const totalAmountInvalid = typeof order.totalAmount !== 'number' || isNaN(order.totalAmount);
      
      if (totalPriceInvalid || totalAmountInvalid) {
        console.log(`\nFixing order ${orderId}...`);
        console.log(`Current totalPrice: ${order.totalPrice}`);
        console.log(`Current totalAmount: ${order.totalAmount}`);
        
        // Calculate correct total from products
        let calculatedTotal = 0;
        if (order.products && Array.isArray(order.products)) {
          calculatedTotal = order.products.reduce((sum, product) => {
            return sum + (product.price * product.quantity);
          }, 0);
        }
        
        console.log(`Calculated total from products: ${calculatedTotal}`);
        
        // Update the order
        await db.collection('orders').doc(orderId).update({
          totalPrice: calculatedTotal,
          totalAmount: calculatedTotal
        });
        
        console.log(`✓ Fixed order ${orderId} with total: ₹${calculatedTotal}`);
        fixedCount++;
      } else {
        skippedCount++;
      }
    }
    
    console.log('\n=== Summary ===');
    console.log(`Total orders: ${ordersSnapshot.size}`);
    console.log(`Fixed: ${fixedCount}`);
    console.log(`Skipped (already correct): ${skippedCount}`);
    console.log('\nDone!');
    
  } catch (error) {
    console.error('Error fixing orders:', error);
  } finally {
    process.exit(0);
  }
}

fixOrderTotals();
