import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDvQQjZjggLRGGXYhKccshhR8-GD8bheEY",
    authDomain: "chatapp-96c03.firebaseapp.com",
    projectId: "chatapp-96c03",
    storageBucket: "chatapp-96c03.appspot.com",
    messagingSenderId: "763312119498",
    appId: "1:763312119498:web:a1d1f020e1406e10e7de33"
};

firebase.initializeApp(config)

export const auth = firebase.auth;
