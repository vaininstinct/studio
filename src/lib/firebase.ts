// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbeywq1-05iTmwu00MUPF6w8mUiPU_mDQ",
  authDomain: "instaleadflow.firebaseapp.com",
  projectId: "instaleadflow",
  storageBucket: "instaleadflow.appspot.com",
  messagingSenderId: "490352429220",
  appId: "1:490352429220:web:fc5bca94bc2d9a0195fe31"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
