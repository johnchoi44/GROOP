// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNM4ByKSk7hN5cZBHTZTfDaj57Q4uuIwM",
  authDomain: "groop-a37d6.firebaseapp.com",
  projectId: "groop-a37d6",
  storageBucket: "groop-a37d6.appspot.com",
  messagingSenderId: "1081146470470",
  appId: "1:1081146470470:web:fd3982f2fa88fc1c055a47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth(app);