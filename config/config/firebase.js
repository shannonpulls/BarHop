import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAb9ddBqr5LleW0KL19aQvjAah28pH0Y9g",
  authDomain: "barhop-d6993.firebaseapp.com",
  projectId: "barhop-d6993",
  storageBucket: "barhop-d6993.appspot.com",
  messagingSenderId: "982101607240",
  appId: "1:982101607240:web:d146d896e14f2c03f9697d",
  measurementId: "G-NWKNT453J1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 