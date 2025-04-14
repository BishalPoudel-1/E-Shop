// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwPLHqzX6MWhTusj1wF1tYGQ8rqFij08w",
  authDomain: "e-shop-2973b.firebaseapp.com",
  projectId: "e-shop-2973b",
  storageBucket: "e-shop-2973b.appspot.com",
  messagingSenderId: "625066712040",
  appId: "1:625066712040:web:2be8b4abf850d65e75a25d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);

export const storage = getStorage(app);
export default app;