import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBhEEYG_DOHg_MyXEpxA3Fjf5goiagvSU",
  authDomain: "weblab-d6839.firebaseapp.com",
  projectId: "weblab-d6839",
  storageBucket: "weblab-d6839.firebasestorage.app",
  messagingSenderId: "179146316759",
  appId: "1:179146316759:web:30bca2d8194cdd9988c992",
  measurementId: "G-PVS0FJRPPQ",
};

// Singleton pattern for Firebase initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
