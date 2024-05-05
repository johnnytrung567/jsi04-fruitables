// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA_FzT0NE-LnjwVMxZWypxn54gYs_LeW0s',
  authDomain: 'fruitables-2904e.firebaseapp.com',
  projectId: 'fruitables-2904e',
  storageBucket: 'fruitables-2904e.appspot.com',
  messagingSenderId: '1077120250521',
  appId: '1:1077120250521:web:23de60cd8c5bfd641dfe08',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
