// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDJlfsu97QngyxYORX7gB9Qx8I_0ESOI0c',
  authDomain: 'prueba-74dc3.firebaseapp.com',
  projectId: 'prueba-74dc3',
  storageBucket: 'prueba-74dc3.appspot.com',
  messagingSenderId: '472600648906',
  appId: '1:472600648906:web:1f9637a24eef19f7bea833',
  measurementId: 'G-MQP6MLETWN',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
