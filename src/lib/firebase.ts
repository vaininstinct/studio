// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

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
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      console.warn('Firestore persistence failed: multiple tabs open.');
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the features required to enable persistence
      console.warn('Firestore persistence failed: browser does not support required features.');
    }
  });


export { app, auth, db };
