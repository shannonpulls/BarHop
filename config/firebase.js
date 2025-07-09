import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_ZI9U33FFYhXiKTEFJxbyth3Dqrual24",
  authDomain: "barhop-7dcc9.firebaseapp.com",
  projectId: "barhop-7dcc9",
  storageBucket: "barhop-7dcc9.appspot.com",
  messagingSenderId: "865377837975",
  appId: "1:865377837975:web:3747d62698230adb69dad2",
  measurementId: "G-Z76JC38F0Y"
};

// Initialize Firebase only once
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 