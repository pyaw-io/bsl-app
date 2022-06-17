import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import env from "react-dotenv";


// Firebase configuration
const firebaseConfig = {
  apiKey:  env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket:env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app