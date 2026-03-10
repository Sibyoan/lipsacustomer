/**
 * Browser Console Script to Fix Order Total Prices
 * 
 * INSTRUCTIONS:
 * 1. Open your Firebase Console: https://console.firebase.google.com
 * 2. Go to your project > Firestore Database
 * 3. Find the 'orders' collection
 * 4. Click on the order document that shows "COD" as the total
 * 5. Look at the 'products' array - calculate the total manually
 * 6. Edit the document and update:
 *    - totalPrice: [calculated total]
 *    - totalAmount: [calculated total]
 * 
 * OR
 * 
 * Simply delete the old test order and place a new order through the website.
 * The new order will have the correct total price.
 */

// Example: If your order has these products:
// Product 1: price = 500, quantity = 1
// Total should be: 500

// Update the order in Firebase Console:
// totalPrice: 500
// totalAmount: 500
