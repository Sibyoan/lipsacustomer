/**
 * Script to seed Firestore with categories
 * 
 * To use this script:
 * 1. Install firebase-admin: npm install firebase-admin
 * 2. Download service account key from Firebase Console
 * 3. Update the path to your service account key below
 * 4. Run: node scripts/seed-categories.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
// Replace with your service account key path
const serviceAccount = require('./path-to-your-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample Categories with proper structure
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Browse our latest electronics and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    createdAt: new Date()
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Everything you need for your home and kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    createdAt: new Date()
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy fashion and apparel',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    createdAt: new Date()
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    description: 'Beauty and personal care products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    createdAt: new Date()
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    slug: 'toys',
    description: 'Fun toys and games for kids of all ages',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',
    createdAt: new Date()
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    slug: 'sports',
    description: 'Sports equipment and outdoor gear',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    createdAt: new Date()
  },
  {
    id: 'books',
    name: 'Books & Stationery',
    slug: 'books',
    description: 'Books, magazines, and stationery items',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    createdAt: new Date()
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    slug: 'health',
    description: 'Health and wellness products',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
    createdAt: new Date()
  }
];

// Sample Products matching the categories
const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life',
    price: 2999,
    discountPrice: 1999,
    category: 'Electronics',
    categoryId: 'electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
    vendorId: 'vendor1',
    vendorName: 'Tech Store',
    stock: 50,
    status: 'approved',
    featured: true,
    createdAt: new Date()
  },
  {
    name: 'Smart Watch Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitor and GPS',
    price: 4999,
    discountPrice: 3499,
    category: 'Electronics',
    categoryId: 'electronics',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
    vendorId: 'vendor1',
    vendorName: 'Tech Store',
    stock: 30,
    status: 'approved',
    bestSelling: true,
    createdAt: new Date()
  },
  {
    name: 'Professional Kitchen Knife Set',
    description: 'Premium 5-piece stainless steel knife set with wooden block',
    price: 1999,
    discountPrice: 1299,
    category: 'Home & Kitchen',
    categoryId: 'home-kitchen',
    images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400'],
    vendorId: 'vendor2',
    vendorName: 'Home Essentials',
    stock: 100,
    status: 'approved',
    createdAt: new Date()
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt for daily wear',
    price: 499,
    discountPrice: 299,
    category: 'Fashion',
    categoryId: 'fashion',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
    vendorId: 'vendor3',
    vendorName: 'Fashion Hub',
    stock: 200,
    status: 'approved',
    newArrival: true,
    createdAt: new Date()
  },
  {
    name: 'Moisturizing Face Cream SPF 30',
    description: 'Daily moisturizing face cream with SPF 30 protection',
    price: 899,
    discountPrice: 649,
    category: 'Beauty & Personal Care',
    categoryId: 'beauty',
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'],
    vendorId: 'vendor4',
    vendorName: 'Beauty Corner',
    stock: 75,
    status: 'approved',
    createdAt: new Date()
  },
  {
    name: 'Educational Building Blocks Set',
    description: 'Colorful building blocks set for creative play and learning',
    price: 1499,
    discountPrice: 999,
    category: 'Toys & Games',
    categoryId: 'toys',
    images: ['https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400'],
    vendorId: 'vendor5',
    vendorName: 'Toy World',
    stock: 60,
    status: 'approved',
    createdAt: new Date()
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...\n');

    // Seed Categories with custom document IDs
    console.log('Seeding categories...');
    for (const category of categories) {
      const { id, ...categoryData } = category;
      await db.collection('categories').doc(id).set(categoryData);
      console.log(`  ✓ Added category: ${category.name} (ID: ${id})`);
    }
    console.log(`\n✓ Successfully added ${categories.length} categories\n`);

    // Seed Products
    console.log('Seeding products...');
    for (const product of products) {
      await db.collection('products').add(product);
      console.log(`  ✓ Added product: ${product.name}`);
    }
    console.log(`\n✓ Successfully added ${products.length} products\n`);

    console.log('✅ Database seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Visit your website homepage to see the categories');
    console.log('2. Click on a category to view products');
    console.log('3. Add more categories from Firebase Console or admin panel');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
