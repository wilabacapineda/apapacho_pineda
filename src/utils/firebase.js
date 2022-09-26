// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsLGNAD_LvCQuaNOhHN2DJYKTM-45YNGg",
  authDomain: "apapacho-53525.firebaseapp.com",
  projectId: "apapacho-53525",
  storageBucket: "apapacho-53525.appspot.com",
  messagingSenderId: "1097795687031",
  appId: "1:1097795687031:web:23f0114c1a95dc10b12c72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//base de datos
export const db  = getFirestore(app)