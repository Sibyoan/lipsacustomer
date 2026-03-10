// Script to add a test banner to Firestore
// Run with: node scripts/add-test-banner.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBjaSfVpgSpOG5ZnaRUawafzpH6mxHzQhU",
  authDomain: "lipsa-aec23.firebaseapp.com",
  projectId: "lipsa-aec23",
  storageBucket: "lipsa-aec23.firebasestorage.app",
  messagingSenderId: "15009459385",
  appId: "1:15009459385:web:76fea985b4d0ae26e6bf68",
  measurementId: "G-ZXNV16PDF4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addTestBanner() {
  try {
    const banner = {
      title: "Summer Sale - Up to 70% Off",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=650&fit=crop",
      mobileImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
      link: "/collections/sale",
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'banners'), banner);
    console.log('✅ Test banner added successfully with ID:', docRef.id);
    console.log('Banner data:', banner);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding banner:', error);
    process.exit(1);
  }
}

addTestBanner();
