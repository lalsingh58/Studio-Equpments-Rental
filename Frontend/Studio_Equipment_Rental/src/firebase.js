// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU48GQlwB_XWCVXcor6XtZsUO8R-VV_J0",
  authDomain: "studio-equipment-rental.firebaseapp.com",
  projectId: "studio-equipment-rental",
  storageBucket: "studio-equipment-rental.firebasestorage.app",
  messagingSenderId: "246863733412",
  appId: "1:246863733412:web:741c4639d7ccb3e9c07c31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
