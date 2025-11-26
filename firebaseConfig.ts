// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKVMa3UlETv1QSoJAl1RRu4oDHDwjyESk",
  authDomain: "daelim-typescript.firebaseapp.com",
  projectId: "daelim-typescript",
  storageBucket: "daelim-typescript.firebasestorage.app",
  messagingSenderId: "476109504320",
  appId: "1:476109504320:web:c46e6a2831efce9cc584a5",
  measurementId: "G-ZWBVLRB6WN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
