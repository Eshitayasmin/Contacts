// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO1xJRyHZJIvVU1LKuPYKzn3cU8qhWQ1M",
  authDomain: "contacts-e0eb2.firebaseapp.com",
  projectId: "contacts-e0eb2",
  storageBucket: "contacts-e0eb2.appspot.com",
  messagingSenderId: "578270725401",
  appId: "1:578270725401:web:a5040cc5f666a998383188"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;