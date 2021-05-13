import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAg2-Az-wB9_y5hLz8ywcPFJk7njwnq77g",
    authDomain: "kendo-habits.firebaseapp.com",
    projectId: "kendo-habits",
    storageBucket: "kendo-habits.appspot.com",
    messagingSenderId: "853810313107",
    appId: "1:853810313107:web:a22e99f46e804c2219da66",
    measurementId: "G-CX80STHMGE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export { db, auth };