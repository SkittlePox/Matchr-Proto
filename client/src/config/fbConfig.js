import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAizxO30so0AhqHXqUhArFvqp_bpkLgEhc",
  authDomain: "musical-buddies.firebaseapp.com",
  databaseURL: "https://musical-buddies.firebaseio.com",
  projectId: "musical-buddies",
  storageBucket: "musical-buddies.appspot.com",
  messagingSenderId: "485928112417",
  appId: "1:485928112417:web:dba0466b0b28b146212e60"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;