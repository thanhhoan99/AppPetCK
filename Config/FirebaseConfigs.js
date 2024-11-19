// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage }  from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGATz5PB-cvrKrHMeRh0SIP7AFMtyxqNU",
  authDomain: "reactgk-4bad4.firebaseapp.com",
  projectId: "reactgk-4bad4",
  storageBucket: "reactgk-4bad4.appspot.com",
  messagingSenderId: "285462211370",
  appId: "1:285462211370:web:dd87f3ff0fdb96367acc53",
  measurementId: "G-Y085FH0GYY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage=getStorage(app);
// const analytics = getAnalytics(app);