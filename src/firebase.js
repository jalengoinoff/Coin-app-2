import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, FieldValue } from "firebase/firestore"; // Added FieldValue
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const firestoreDB = getFirestore(firebaseApp);
// const FieldValue = getFieldVale(firebaseApp); // Remove this line

export { auth, db, storage, firestoreDB, FieldValue }; // Export FieldValue
