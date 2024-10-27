// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDujn8Q0caCPfg_YVtKbxxHNS4puvv97ZU",
  authDomain: "moviegpt-47abb.firebaseapp.com",
  projectId: "moviegpt-47abb",
  storageBucket: "moviegpt-47abb.appspot.com",
  messagingSenderId: "828072457247",
  appId: "1:828072457247:web:9e4b6aa618142a2293512a",
  measurementId: "G-YDNJ6HP3MN"
};

// Initialize Firebase
export const app1 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app1);

// export const auth = getAuth();