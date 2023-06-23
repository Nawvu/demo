// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCiKygkI57eyVfDEEePHiAnDtt555AmEn4',
	authDomain: 'event-test-nvm.firebaseapp.com',
	projectId: 'event-test-nvm',
	storageBucket: 'event-test-nvm.appspot.com',
	messagingSenderId: '1071727833689',
	appId: '1:1071727833689:web:45207e0b0f20440f0cf748'
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(firebase);
