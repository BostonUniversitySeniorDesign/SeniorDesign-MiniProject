import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA8OfMkCdoq8VQ7pNSHr8oAjZUqzm8wPIw',
  authDomain: 'sw14miniproject.firebaseapp.com',
  databaseURL: 'https://sw14miniproject-default-rtdb.firebaseio.com/',
  projectId: 'sw14miniproject',
  storageBucket: 'sw14miniproject.appspot.com',
  messagingSenderId: '752428129862',
  appId: '1:752428129862:ios:69b146cddb92abb2403447',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var config = {
  FDA_API : rF0UJLafWZHGG91JRLNLIUXbjExmPH9hnyAU98qe
}

export { firebase };