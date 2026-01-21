import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "dummy_key",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "dummy.firebaseapp.com",
  projectId: import.meta.env.VITE_PROJECT_ID || "dummy-id",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "dummy.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "12345",
  appId: import.meta.env.VITE_APP_ID || "1:12345:web:12345",
  measurementId: import.meta.env.VITE_MEASUREMENT_ID || "G-12345",
};

// We only initialize if a real key is likely present
let app, auth, googleProvider;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.error("Firebase initialization failed, but app will continue loading UI:", error);
  // Provide empty objects so the rest of the app doesn't crash
  auth = {};
  googleProvider = {};
}

export { app, auth, googleProvider };

