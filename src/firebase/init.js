// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApB6GJMsnxN0E-KpWXuBAvqsMNtdRo7e8",
  authDomain: "fir-practice-c1f7c.firebaseapp.com",
  projectId: "fir-practice-c1f7c",
  storageBucket: "fir-practice-c1f7c.appspot.com",
  messagingSenderId: "421300754785",
  appId: "1:421300754785:web:04df62bd030e5d4bd00d20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();