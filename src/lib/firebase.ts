// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// =================================================================================
// HOW TO FIND YOUR FIREBASE CONFIGURATION:
//
// 1. Go to your Firebase project console: https://console.firebase.google.com/
//
// 2. In the left sidebar, click the gear icon (⚙️) next to "Project Overview", 
//    then select "Project settings".
//
// 3. In the "General" tab, scroll down to the "Your apps" section.
//
// 4. In the list of your apps, find your web app (if you don't have one, create it).
//
// 5. In the "SDK setup and configuration" panel, select the "Config" option.
//
// 6. You will see a block of code that looks like this:
//    const firebaseConfig = {
//      apiKey: "AIb2SyC...ABC123",
//      authDomain: "your-project-id.firebaseapp.com",
//      ...and so on
//    };
//
// 7. Copy the values from YOUR project console and paste them below,
//    replacing the "PASTE_YOUR_..." placeholders.
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
