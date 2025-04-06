// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "password-manager-6106f.firebaseapp.com",
  projectId: "password-manager-6106f",
  storageBucket: "password-manager-6106f.firebasestorage.app",
  messagingSenderId: "263435152339",
  appId: "1:263435152339:web:331a50db365491da305d26"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);