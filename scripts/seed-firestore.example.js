/**
 * Example script to seed Firestore with sample data
 * 
 * To use this script:
 * 1. Install firebase-admin: npm install firebase-admin
 * 2. Download service account key from Firebase Console
 * 3. Update the path to your service account key
 * 4. Run: node scripts/seed-firestore.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./path-to-your-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample Categories
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Browse our latest electronics and gadgets',
    image: 'https://via.placeholder.com/300x200?text=Electronics',
    createdAt: new Date()
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Everything you need for your home and kitchen',
    image: 'https://via.placeholder.com/300x200?text=Home+Kitchen',
    createdAt: new Date()
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy fashion and apparel',
    image: 'https://via.placeholder.com/300x200?text=Fashion',
    createdAt: new Date()
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Beauty and personal care products',
    image: 'https://via.placeholder.com/300x200?text=Beauty',
    createdAt: new Date()
  },
  {
    id: 'toys',
    name: 'Toys',
    slug: 'toys',
    description: 'Fun toys for kids of all ages',
    image: 'https://via.placeholder.com/300x200?text=Toys',
    createdAt: new Date()
  }
];

// Sample Products
const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 2999,
    discountPrice: 1999,
    category: 'Electronics',
    categoryId: 'electronics',
    images: ['https://via.placeholder.com/400x400?text=Headphones'],
    vendorId: 'vendor1',
    stock: 50,
    status: 'approved',
    createdAt: new Date()
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor',
    price: 4999,
    discountPrice: 3499,
    category: 'Electronics',
    categoryId: 'electronics',
    images: ['https://via.placeholder.com/400x400?text=Smart+Watch'],
    vendorId: 'vendor1',
    stock: 30,
    status: 'approved',
    createdAt: new Date()
  },
  {
    name: 'Kitchen Knife Set',
    description: 'Professional 5-piece knife set',
    price: 1999,
    discountPrice: 1299,
    category: 'Home & Kitchen',
    categoryId: 'home-kitchen',
    images: ['https://via.placeholder.com/400x400?text=Knife+Set'],
    vendorId: 'vendor2',
    stock: 100,
    status: 'approved',
    createdAt: new Date()
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt for daily wear',
    price: 499,
    discountPrice: 299,
    category: 'Fashion',
    categoryId: 'fashion',
    images: ['https://via.placeholder.com/400x400?text=T-Shirt'],
    vendorId: 'vendor3',
    stock: 200,
    status: 'approved',
    createdAt: new Date()
  },
  {
    name: 'Face Cream',
    description: 'Moisturizing face cream with SPF',
    price: 899,
    discountPrice: 649,
    category: 'Beauty',
    categoryId: 'beauty',
    images: ['https://via.placeholder.com/400x400?text=Face+Cream'],
    vendorId: 'vendor4',
    stock: 75,
    status: 'approved',
    createdAt: new Date()
  },
  {
    name: 'Building Blocks Set',
    description: 'Educational building blocks for kids',
    price: 1499,
    discountPrice: 999,
    category: 'Toys',
    categoryId: 'toys',
    images: ['https://via.placeholder.com/400x400?text=Building+Blocks'],
    vendorId: 'vendor5',
    stock: 60,
    status: 'approved',
    createdAt: new Date()
  }
];

// Sample Banners
const banners = [
  {
    title: 'Summer Sale',
    image: 'https://via.placeholder.com/1200x400?text=Summer+Sale',
    link: '/collections/summer-sale',
    createdAt: new Date()
  },
  {
    title: 'New Arrivals',
    image: 'https://via.placeholder.com/1200x400?text=New+Arrivals',
    link: '/collections/new-arrivals',
    createdAt: new Date()
  },
  {
    title: 'Electronics Deal',
    image: 'https://via.placeholder.com/1200x400?text=Electronics+Deal',
    link: '/collections/electronics',
    createdAt: new Date()
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Seed Categories with custom IDs
    console.log('Seeding categories...');
    for (const category of categories) {
      const { id, ...categoryData } = category;
      await db.collection('categories').doc(id).set(categoryData);
    }
    console.log(`✓ Added ${categories.length} categories`);

    // Seed Products
    console.log('Seeding products...');
    for (const product of products) {
      await db.collection('products').add(product);
    }
    console.log(`✓ Added ${products.length} products`);

    // Seed Banners
    console.log('Seeding banners...');
    for (const banner of banners) {
      await db.collection('banners').add(banner);
    }
    console.log(`✓ Added ${banners.length} banners`);

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
