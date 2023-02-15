import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG3T5jUd4vvazgo-ZJ2z5WqToRFap0OGY",
  authDomain: "cars-list-d7135.firebaseapp.com",
  databaseURL: "https://cars-list-d7135-default-rtdb.firebaseio.com",
  projectId: "cars-list-d7135",
  storageBucket: "cars-list-d7135.appspot.com",
  messagingSenderId: "607260491579",
  appId: "1:607260491579:web:7e68095bb4187c62d4011e",
  measurementId: "G-6RPL6BF9M7",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
