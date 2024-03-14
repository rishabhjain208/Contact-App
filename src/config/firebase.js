// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbG-sg_zmoNF0EPNUzsZYLiKlvliRz-lQ",
  authDomain: "contact-app-b8a66.firebaseapp.com",
  projectId: "contact-app-b8a66",
  storageBucket: "contact-app-b8a66.appspot.com",
  messagingSenderId: "311589779883",
  appId: "1:311589779883:web:a0b00455516c03f18f7aee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);