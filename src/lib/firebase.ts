// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// =================================================================================
// IMPORTANT: PASTE YOUR FIREBASE CONFIGURATION HERE
// =================================================================================
// 1. Go to your Firebase project console.
// 2. Go to Project Settings (gear icon) -> General tab.
// 3. Scroll down to "Your apps".
// 4. In "SDK setup and configuration", select "Config".
// 5. Copy the values and paste them below, replacing the placeholder strings.
// =================================================================================
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
