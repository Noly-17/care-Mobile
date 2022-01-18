import firebase from 'firebase/compat/app';
import { getAuth } from '@firebase/auth';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const app = firebase.initializeApp({
    apiKey: "AIzaSyCgRkp_e2xLmnvhAUUW4oCXg3qm70XJUcE",
    authDomain: "care-32007.firebaseapp.com",
    databaseURL: "https://care-32007-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "care-32007",
    storageBucket: "care-32007.appspot.com",
    messagingSenderId: "78412221759",
    appId: "1:78412221759:web:7ef070aced543dc7b3578a",
    measurementId: "G-3ZNPPM4JFS"
});


export const auth = getAuth()
export const db = getDatabase()
export const storage = getStorage()
export default app;