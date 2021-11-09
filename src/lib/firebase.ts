import {
  initializeApp
} from "firebase/app";
import {
  getFirestore
} from "firebase/firestore"
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider
} from "firebase/auth"
import {
  setDoc,
  doc
} from "firebase/firestore"
import {
  goto
} from "$app/navigation";
import {
  getNotificationsContext
} from 'svelte-notifications';


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

// Auth Providers
export const googleAuth = new GoogleAuthProvider()
export const facebookAuth = new FacebookAuthProvider()
export const githubAuth = new GithubAuthProvider()


// Send user data to database
export const sendToDatabase = async (user) => {
  console.log(user.uid)
  console.log(user.email)
  console.log(user.id)
  const userPrivateRef = doc(db, 'users', `${user.uid}`, 'private', 'data');
  const userPublicRef = doc(db, 'users', `${user.uid}`, 'public', 'data');
  await setDoc(
    userPrivateRef, {
      email: user.email,
      uid: user.uid,
    }, {
      merge: true
    }
  );
  await setDoc(userPublicRef, {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid
  }, {
    merge: true
  })
};