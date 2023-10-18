// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCywKIRHtpQ_2EK2Zo2GPJAT9s0xlpVr5Q",
    authDomain: "carstore-e43f0.firebaseapp.com",
    projectId: "carstore-e43f0",
    storageBucket: "carstore-e43f0.appspot.com",
    messagingSenderId: "117357506882",
    appId: "1:117357506882:web:3bfc2ae63dc19b4ea858db",
    measurementId: "G-NPG14DJLZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);