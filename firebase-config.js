import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBdJws01adwrTNwNOq1bRzA85zT7p4mvHw",
  authDomain: "netflix-clone-41ad8.firebaseapp.com",
  projectId: "netflix-clone-41ad8",
  storageBucket: "netflix-clone-41ad8.appspot.com",
  messagingSenderId: "606786081531",
  appId: "1:606786081531:web:6aa2aa56bbd2c6fcbb565e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)