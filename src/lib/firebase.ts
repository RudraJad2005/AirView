// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;

// Check if all required environment variables are present
const allVarsPresent = Object.values(firebaseConfig).every(value => !!value);

if (!getApps().length && allVarsPresent) {
  app = initializeApp(firebaseConfig);
} else if (allVarsPresent) {
  app = getApp();
} else {
  // If variables are missing, we're likely in a build environment
  // You can return a mock/dummy app or handle it as needed.
  // For now, we'll just avoid initializing and let auth/db fail gracefully
  // on the server during build.
  console.warn("Firebase environment variables are not fully set. Skipping Firebase initialization during build.");
}

// Ensure you are exporting initialized services only if the app was initialized.
const auth = app! ? getAuth(app) : null;
const db = app! ? getFirestore(app) : null;


export { app, auth, db };