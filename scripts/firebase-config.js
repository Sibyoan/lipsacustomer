// Shared Firebase configuration for scripts
// This file should be used by all scripts instead of hardcoding credentials

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBjaSfVpgSpOG5ZnaRUawafzpH6mxHzQhU",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "lipsa-aec23.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "lipsa-aec23",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "lipsa-aec23.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "15009459385",
  appId: process.env.FIREBASE_APP_ID || "1:15009459385:web:76fea985b4d0ae26e6bf68",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-ZXNV16PDF4"
};

module.exports = { firebaseConfig };