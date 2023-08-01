// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4OqJ-JYkZRXGE_11kx8CVLFJ97nXI6Uw",
  authDomain: "fir-contactapp-88d3b.firebaseapp.com",
  projectId: "fir-contactapp-88d3b",
  storageBucket: "fir-contactapp-88d3b.appspot.com",
  messagingSenderId: "419234321178",
  appId: "1:419234321178:web:7e4bfadbe14cb5b5e352a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);