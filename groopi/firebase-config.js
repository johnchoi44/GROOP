// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getDatabase} from "firebase/database"
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz1H3oqIyv7yIeSYYNS-z9H1kH9ZKAXXg",
  authDomain: "groopv0-efec2.firebaseapp.com",
  databaseURL: "https://groopv0-efec2-default-rtdb.firebaseio.com",
  projectId: "groopv0-efec2",
  storageBucket: "groopv0-efec2.appspot.com",
  messagingSenderId: "627000399286",
  appId: "1:627000399286:web:b404c21ec175de01219d17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const database = getDatabase(app);
