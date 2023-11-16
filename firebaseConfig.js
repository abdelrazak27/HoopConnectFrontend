import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAL2gMres6RlbmZljQluRmyNLJ2ZtQTQWg",
    authDomain: "hoopconnect-e17eb.firebaseapp.com",
    projectId: "hoopconnect-e17eb",
    storageBucket: "hoopconnect-e17eb.appspot.com",
    messagingSenderId: "970205309675",
    appId: "1:970205309675:web:ca7ccf7c2acc9633a52cae"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);