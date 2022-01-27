import {
  initializeApp
} from "@firebase/app";
import {
  getFirestore, doc, writeBatch
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

export const storeUserData = async (db, user, username, displayName) => {
  console.log({user,username})

  const batch = writeBatch(db)

  batch.set(doc(db,"usernames", username),{
    uid : user.uid
  })

  batch.set(doc(db, "users", user.uid), {
    displayName: displayName,
    photoURL: "/profile_picture",
    username: username,
    uid: user.uid
  })

  batch.set(doc(db, "users", user.uid, "private", "data"), {
    email: user.email,
    username: username,
    uid: user.uid
  })

  await batch.commit()

}