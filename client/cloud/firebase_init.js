import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "../config/firebase_config";

const app = firebase.initializeApp(firebaseConfig);

const firestore_db = app.firestore();
const firebase_storage = app.storage();

module.exports = { firestore_db, firebase_storage };
