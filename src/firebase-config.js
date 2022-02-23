import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvyyIRoYMq2OwLqs74p60wS9QvYGftKi4",
  authDomain: "kardbank-bb0fd.firebaseapp.com",
  projectId: "kardbank-bb0fd",
  storageBucket: "kardbank-bb0fd.appspot.com",
  messagingSenderId: "814411175241",
  appId: "1:814411175241:web:e7765eeae4e01d709af698",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
