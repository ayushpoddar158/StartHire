// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjfbq3drBNOrGTrnUp2rLF9cVPMdkbq3Q",
  authDomain: "starthire-2bec8.firebaseapp.com",
  projectId: "starthire-2bec8",
  storageBucket: "starthire-2bec8.appspot.com",
  messagingSenderId: "406820819253",
  appId: "1:406820819253:web:5034010644a95491fdbc7c",
  measurementId: "G-DFZQBXSE1H"
};

// Initialize Firebase
const Author = initializeApp(firebaseConfig);
const analytics = getAnalytics(Author);

export const Auth = getAuth(Author)
export default Author