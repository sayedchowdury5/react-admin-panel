import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyB06zFlxgzo8B6aLBZy2QiT-GyRmML5Zjs",
    authDomain: "bd-book-apps-files.firebaseapp.com",
    //databaseURL: "https://blood-components.firebaseio.com",
    projectId: "bd-book-apps-files",
    storageBucket: "bd-book-apps-files.appspot.com",
    messagingSenderId: "391920232",
    appId: "1:391920232:web:93de7d378e5f51e2d759dd",
    measurementId: "G-J40XBE91NE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//const auth = firebase.auth();
//const db = firebase.firestore();

//initiating references to the databases
//const usersRef = db.collection('users')

// for privileges purposes
//const functions = firebase.functions();

//google provider sign-in
//const googleProvider = new firebase.auth.GoogleAuthProvider();


//export { firebase, db, auth, functions, googleProvider }
export default firebase;