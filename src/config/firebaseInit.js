//creating firebase config here and exporting.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "busy-buy-app-8b870.firebaseapp.com",
  projectId: "busy-buy-app-8b870",
  storageBucket: "busy-buy-app-8b870.appspot.com",
  messagingSenderId: "147508862667",
  appId: appId,
  measurementId: "G-0BZXQM5EBC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
