import {
  initializeApp
} from "firebase/app";
import {
  Firestore,
  getFirestore
} from "firebase/firestore"
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  Auth,
  AuthProvider
} from "firebase/auth"
import { Functions, getFunctions } from "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyAfM40T5V1tZ33zgLzY4M229ZLv3W7j1Rg",
  authDomain: "mesh-dev-55129.firebaseapp.com",
  projectId: "mesh-dev-55129",
  storageBucket: "mesh-dev-55129.appspot.com",
  messagingSenderId: "644966883447",
  appId: "1:644966883447:web:9d28f20e241f13faace672",
  measurementId: "G-MF5LG7075Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


//Exports
export const db:Firestore = getFirestore();
export const auth:Auth = getAuth()
export const functions:Functions = getFunctions(app)

// Auth Providers
export const googleAuth:AuthProvider = new GoogleAuthProvider()
export const facebookAuth:AuthProvider = new FacebookAuthProvider()
export const githubAuth:AuthProvider = new GithubAuthProvider()