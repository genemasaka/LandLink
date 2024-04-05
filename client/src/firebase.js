// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "landlink-a2caa.firebaseapp.com",
  projectId: "landlink-a2caa",
  storageBucket: "landlink-a2caa.appspot.com",
  messagingSenderId: "408320472589",
  appId: "1:408320472589:web:54c18af827817212d4c744",
  measurementId: "G-015MY1D27V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);