// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7BDaGgzAyjYqQomt15fxfdxmRN4PwGxM",
  authDomain: "hotel-booking-app-c9522.firebaseapp.com",
  projectId: "hotel-booking-app-c9522",
  storageBucket: "hotel-booking-app-c9522.firebasestorage.app",
  messagingSenderId: "466739519829",
  appId: "1:466739519829:web:b8d8d3766c43f771728fdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };