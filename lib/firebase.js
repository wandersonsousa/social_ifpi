import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCzBmjxE--02Ptt_DY1Tjm7ZuVovZ8Lgzc",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "social-ifpi.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "social-ifpi",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET|| "social-ifpi.appspot.com", 
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID || "260799365086", 
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:260799365086:web:3d713eb90cb4609460a74f",
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth,db,storage };