import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCc4rJPxaSHrKpjvOiAi3Bwl3w3GHITe8w",
    authDomain: "recipes-app-defb1.firebaseapp.com",
    databaseURL: "https://recipes-app-defb1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "recipes-app-defb1",
    storageBucket: "recipes-app-defb1.appspot.com",
    messagingSenderId: "106624498292",
    appId: "1:106624498292:web:f396fb95c2eb198578af21",
    measurementId: "G-PVMRZXKNX4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;