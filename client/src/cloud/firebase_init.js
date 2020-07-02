import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import { firebaseConfig } from "../config/firebase_config";

const app = firebase.initializeApp(firebaseConfig);

export const firestore_db = app.firestore();
export const firebase_storage = app.storage();
export const firebase_auth = app.auth();
