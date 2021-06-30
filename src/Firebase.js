import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyD1H8BYjWgxpGFa6zQkGBwRHzwVp4utpak",
    authDomain: "amzon-clone-e762f.firebaseapp.com",
    databaseURL: "https://amzon-clone-e762f-default-rtdb.firebaseio.com",
    projectId: "amzon-clone-e762f",
    storageBucket: "amzon-clone-e762f.appspot.com",
    messagingSenderId: "930742026471",
    appId: "1:930742026471:web:29af7d089849f8ba48e242",
    measurementId: "G-0T8WFBTME0"
  };
  // Initialize Firebase
var firebaseDb =   firebase.initializeApp(firebaseConfig);

export default firebaseDb.database().ref()