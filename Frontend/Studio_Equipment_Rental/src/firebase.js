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

// installHook.js:1 TypeError: Cannot read properties of undefined (reading 'appVerificationDisabledForTesting')
//     at new RecaptchaVerifier (index-dfb5c973.js:8634:52)
//     at setupRecaptcha (App.jsx:18:32)
//     at sendOtp (App.jsx:28:7)
//     at executeDispatch (react-dom-client.development.js:19116:9)
//     at runWithFiberInDEV (react-dom-client.development.js:871:30)
//     at processDispatchQueue (react-dom-client.development.js:19166:19)
//     at react-dom-client.development.js:19767:9
//     at batchedUpdates$1 (react-dom-client.development.js:3255:40)
//     at dispatchEventForPluginEventSystem (react-dom-client.development.js:19320:7)
//     at dispatchEvent (react-dom-client.development.js:23585:11)
// overrideMethod @ installHook.js:1
