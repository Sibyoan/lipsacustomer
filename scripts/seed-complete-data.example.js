/**
 * Complete Seed Script for Firebase Firestore
 * 
 * This script populates your Firestore database with sample data for:
 * - Categories
 * - Products
 * - Banners
 * 
 * Instructions:
 * 1. Copy this file and rename to seed-complete-data.js
 * 2. Update Firebase config if needed
 * 3. Run: node scripts/seed-complete-data.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjaSfVpgSpOG5ZnaRUawafzpH6mxHzQhU",
  authDomain: "lipsa-aec23.firebaseapp.com",
  projectId: "lipsa-aec23",
  storageBucket: "lipsa-aec23.firebasestorage.app",
  messagingSenderId: "15009459385",
  appId: "1:15009459385:web:76fea985b4d0ae26e6bf68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample Categories
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic gadgets and devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    icon: '📱',
    createdAt: new Date()
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    icon: '👗',
    createdAt: new Date()
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Everything for your home',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    icon: '🏠',
    createdAt: new Date()
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    description: 'Beauty and personal care products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    icon: '💄',
    createdAt: new Date()
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    slug: 'sports',
    description: 'Sports equipment and fitness gear',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    icon: '⚽',
    createdAt: new Date()
  }
];

// Sample Products
const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life',
    price: 2999,
    discountPrice: 1999,
    category: 'Electronics',
    categoryId: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    vendorId: 'vendor1',
    vendorName: 'TechStore',
    stock: 50,
    status: 'approved',
    featured: true,
    bestSelling: true,
    newArrival: false,
    createdAt: new Date()
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health tracking, GPS, and 7-day battery',
    price: 4999,
    discountPrice: 3499,
    category: 'Electronics',
    categoryId: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'
    ],
    vendorId: 'vendor1',
    vendorName: 'TechStore',
    stock: 30,
    status: 'approved',
    featured: true,
    bestSelling: false,
    newArrival: true,
    createdAt: new Date()
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 799,
    discountPrice: 499,
    category: 'Electronics',
    categoryId: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
    ],
    vendorId: 'vendor1',
    vendorName: 'TechStore',
    stock: 100,
    status: 'approved',
    featured: false,
    bestSelling: true,
    newArrival: false,
    createdAt: new Date()
  },

  // Fashion
  {
    name: 'Cotton T-Shirt Pack of 3',
    description: 'Premium quality cotton t-shirts in assorted colors',
    price: 1499,
    discountPrice: 999,
    category: 'Fashion',
    categoryId: 'fashion',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'
    ],
    vendorId: 'vendor2',
    vendorName: 'FashionHub',
    stock: 200,
    status: 'approved',
    featured: true,
    bestSelling: true,
    newArrival: false,
    createdAt: new Date()
  },
  {
    name: 'Denim Jeans',
    description: 'Comfortable slim-fit denim jeans',
    price: 2499,
    discountPrice: 1799,
    category: 'Fashion',
    categoryId: 'fashion',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'
    ],
    vendorId: 'vendor2',
    vendorName: 'FashionHub',
    stock: 150,
    status: 'approved',
    featured: false,
    bestSelling: true,
    newArrival: false,
    createdAt: new Date()
  },

  // Home & Kitchen
  {
    name: 'Non-Stick Cookware Set',
    description: '5-piece non-stick cookware set with glass lids',
    price: 3999,
    discountPrice: 2499,
    category: 'Home & Kitchen',
    categoryId: 'home-kitchen',
    images: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500'
    ],
    vendorId: 'vendor3',
    vendorName: 'HomeEssentials',
    stock: 40,
    status: 'approved',
    featured: true,
    bestSelling: false,
    newArrival: true,
    createdAt: new Date()
  },
  {
    name: 'Electric Kettle',
    description: '1.8L electric kettle with auto shut-off',
    price: 1299,
    discountPrice: 899,
    category: 'Home & Kitchen',
    categoryId: 'home-kitchen',
    images: [
      'https://images.unsplash.com/photo-1563822249366-3efbb5c8c5ca?w=500'
    ],
    vendorId: 'vendor3',
    vendorName: 'HomeEssentials',
    stock: 60,
    status: 'approved',
    featured: false,
    bestSelling: true,
    newArrival: false,
    createdAt: new Date()
  },

  // Beauty
  {
    name: 'Skincare Gift Set',
    description: 'Complete skincare routine with cleanser, toner, and moisturizer',
    price: 2999,
    discountPrice: 1999,
    category: 'Beauty & Personal Care',
    categoryId: 'beauty',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'
    ],
    vendorId: 'vendor4',
    vendorName: 'BeautyWorld',
    stock: 80,
    status: 'approved',
    featured: true,
    bestSelling: true,
    newArrival: true,
    createdAt: new Date()
  },

  // Sports
  {
    name: 'Yoga Mat with Bag',
    description: 'Premium non-slip yoga mat with carrying bag',
    price: 1499,
    discountPrice: 999,
    category: 'Sports & Fitness',
    categoryId: 'sports',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'
    ],
    vendorId: 'vendor5',
    vendorName: 'FitLife',
    stock: 70,
    status: 'approved',
    featured: false,
    bestSelling: true,
    newArrival: false,
    createdAt: new Date()
  },
  {
    name: 'Resistance Bands Set',
    description: 'Set of 5 resistance bands for home workouts',
    price: 899,
    discountPrice: 599,
    category: 'Sports & Fitness',
    categoryId: 'sports',
    images: [
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500'
    ],
    vendorId: 'vendor5',
    vendorName: 'FitLife',
    stock: 120,
    status: 'approved',
    featured: false,
    bestSelling: false,
    newArrival: true,
    createdAt: new Date()
  }
];

// Sample Banners
const banners = [
  {
    title: 'Mega Sale - Up to 70% Off',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    mobileImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    link: '/collections/electronics',
    createdAt: new Date()
  },
  {
    title: 'New Arrivals - Shop Now',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    mobileImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    link: '/collections/fashion',
    createdAt: new Date()
  },
  {
    title: 'Home Essentials - Best Prices',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
    mobileImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    link: '/collections/home-kitchen',
    createdAt: new Date()
  }
];

// Seed function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Seed Categories
    console.log('📁 Seeding categories...');
    for (const category of categories) {
      await setDoc(doc(db, 'categories', category.id), category);
      console.log(`  ✓ Added category: ${category.name}`);
    }
    console.log(`✅ ${categories.length} categories added\n`);

    // Seed Products
    console.log('📦 Seeding products...');
    for (const product of products) {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log(`  ✓ Added product: ${product.name} (${docRef.id})`);
    }
    console.log(`✅ ${products.length} products added\n`);

    // Seed Banners
    console.log('🎨 Seeding banners...');
    for (const banner of banners) {
      const docRef = await addDoc(collection(db, 'banners'), banner);
      console.log(`  ✓ Added banner: ${banner.title} (${docRef.id})`);
    }
    console.log(`✅ ${banners.length} banners added\n`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Banners: ${banners.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
