import {
  initializeApp
} from "@firebase/app";
import {
  getFirestore
} from "@firebase/firestore"
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider
} from "@firebase/auth"
import { getFunctions } from "@firebase/functions"

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
export const db = getFirestore();
export const auth = getAuth()
export const functions = getFunctions(app, "europe-west1")

// Auth Providers
export const googleAuth = new GoogleAuthProvider()
export const facebookAuth = new FacebookAuthProvider()
export const microsoftAuth = new OAuthProvider("microsoft.com")