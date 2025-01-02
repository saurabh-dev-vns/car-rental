// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXpe15QTDJgwY89GkheLRdQd8YvBvGmX8",
  authDomain: "car-rental-5802d.firebaseapp.com",
  projectId: "car-rental-5802d",
  storageBucket: "car-rental-5802d.firebasestorage.app",
  messagingSenderId: "564802296352",
  appId: "1:564802296352:web:d4168957c71896625dfa45",
  measurementId: "G-C2EFLP29ZZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };