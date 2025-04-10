// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDZQPCFM1tcrb2aWZyxZQMakRobK56nYN0",
    authDomain: "skillsync-58ab5.firebaseapp.com",
    projectId: "skillsync-58ab5",
    storageBucket: "skillsync-58ab5.firebasestorage.app",
    messagingSenderId: "962436951520",
    appId: "1:962436951520:web:3bdfe1733a70d6988e0f85",
    measurementId: "G-6H4WKTTDPG"
  };
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
