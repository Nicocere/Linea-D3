import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_FIREBASE_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE ,
  messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID ,
  appId:  process.env.REACT_APP_FIREBASE_APP_ID ,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const baseDeDatos = getFirestore(app);
export const auth = getAuth(app);  // Agrega esta línea
export const storage = getStorage(app);

