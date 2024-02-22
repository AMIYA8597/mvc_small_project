// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY_GOES_HERE,
  authDomain: REACT_APP_AUTH_DOMAIN_GOES_HERE,
  projectId: REACT_APP_PROJECT_ID_GOES_HERE,
  storageBucket: REACT_APP_STORAGE_BUCKET_GOES_HERE,
  messagingSenderId: REACT_APP_MESSSAGING_SENDER_ID_GOES_HERE,
  appId: REACT_APP_APP_ID_GOES_HERE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);