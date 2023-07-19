import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB27BFAKwmzJomLokBE6-H29c4oHqay7as",
  authDomain: "shopee-fake-ba879.firebaseapp.com",
  projectId: "shopee-fake-ba879",
  storageBucket: "shopee-fake-ba879.appspot.com",
  messagingSenderId: "504216281323",
  appId: "1:504216281323:web:f1460901fe234ba7635eae",
}

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
