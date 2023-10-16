import firebase from "firebase/app";
import "firebase/auth"; // Si vas a usar autenticación
import "firebase/firestore"; // Si vas a usar Firestore

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar las funcionalidades que vas a usar
export const auth = firebase.auth();
export const db = firebase.firestore();
