// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz1H3oqIyv7yIeSYYNS-z9H1kH9ZKAXXg",
  authDomain: "groopv0-efec2.firebaseapp.com",
  projectId: "groopv0-efec2",
  storageBucket: "groopv0-efec2.appspot.com",
  messagingSenderId: "627000399286",
  appId: "1:1081146470470:web:fd3982f2fa88fc1c055a47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth(app);