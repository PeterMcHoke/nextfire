import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBEL6c7rw8Wdt36s4y6vNIyu6HUzuw5diA",
    authDomain: "nextfire-13770.firebaseapp.com",
    projectId: "nextfire-13770",
    storageBucket: "nextfire-13770.appspot.com",
    messagingSenderId: "845508932406",
    appId: "1:845508932406:web:a97f5fa0b019ff8835b997",
    measurementId: "G-N25X61LJT2"
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
// increment is so that you don't have to use a read and a write just to increment
//Airtable doesn't do this, annoying but thanks Firebase!
export const increment = firebase.firestore.FieldValue.increment;

/// Helper functions

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

