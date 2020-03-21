import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
