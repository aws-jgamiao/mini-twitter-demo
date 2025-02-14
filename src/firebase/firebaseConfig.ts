import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4bwMJnXW5xy7JKkBPUDqBJC4iWsMx804",
  authDomain: "twitter-demo-253d2.firebaseapp.com",
  databaseURL: "https://twitter-demo-253d2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "twitter-demo-253d2",
  storageBucket: "twitter-demo-253d2.firebasestorage.app", // Fixed storage bucket URL
  messagingSenderId: "1058298840087",
  appId: "1:1058298840087:web:bb7261b3eaa8e7e9890852",
  measurementId: "G-580RMFNHPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };


