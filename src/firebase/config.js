import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

//firebase configuration + add export to firebaseconfig
export const firebaseConfig = {
  apiKey: "AIzaSyA1nRMkN9nWAxeRKibzkW5NJdxkAntr_fI",
  authDomain: "tageronline-28a5e.firebaseapp.com",
  projectId: "tageronline-28a5e",
  storageBucket: "tageronline-28a5e.appspot.com",
  messagingSenderId: "70838949992",
  appId: "1:70838949992:web:85bd91d32cf7fa605b43dd",
  measurementId: "G-NL8KPXPHHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

